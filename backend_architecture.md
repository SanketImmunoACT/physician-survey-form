# Production-Level Backend Architecture for Physician Survey Form

## Executive Summary

This document outlines a comprehensive, production-ready backend architecture for the Physician Survey Form application. The architecture is designed to handle healthcare data securely, scale efficiently, and provide robust analytics capabilities.

## Current State Analysis

### Existing Components:
- **Frontend**: Next.js 15.4.1 with React 19.1.0
- **Authentication**: Basic bcrypt-based auth with localStorage
- **Data Storage**: localStorage-based dataStore (non-persistent)
- **Form Handling**: Complex multi-step survey forms
- **Analytics**: Client-side data processing
- **UI**: Tailwind CSS with Radix UI components

### Current Limitations:
- No persistent database
- No proper authentication/authorization
- No API layer
- No data validation
- No audit trails
- No backup/recovery
- No security measures
- No scalability considerations

## Target Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Gateway   │    │   Load Balancer │
│   (Next.js)     │◄──►│   (Kong/Nginx)  │◄──►│   (HAProxy)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Auth Service  │    │   API Service   │    │   Analytics     │
│   (JWT/OAuth)   │◄──►│   (Express.js)  │◄──►│   Service       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                                ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Database      │    │   Cache Layer   │    │   File Storage  │
│   (PostgreSQL)  │◄──►│   (Redis)       │◄──►│   (S3/MinIO)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 1. Core Backend Services

### 1.1 API Gateway Service
```javascript
// services/api-gateway/index.js
const express = require('express');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// JWT verification middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Route protection
app.use('/api/surveys', authenticateToken);
app.use('/api/analytics', authenticateToken);
app.use('/api/admin', authenticateToken);

module.exports = app;
```

### 1.2 Authentication Service
```javascript
// services/auth-service/index.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { z } = require('zod');

const prisma = new PrismaClient();
const app = express();

// Validation schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['SALESPERSON', 'ADMIN', 'PHYSICIAN'])
});

// Login endpoint
app.post('/login', async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    
    const user = await prisma.user.findUnique({
      where: { email, isActive: true }
    });
    
    if (!user || !await bcrypt.compare(password, user.passwordHash)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Register endpoint
app.post('/register', async (req, res) => {
  try {
    const userData = registerSchema.parse(req.body);
    
    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        passwordHash: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        role: userData.role
      }
    });
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = app;
```

## 2. Database Layer

### 2.1 Database Configuration
```javascript
// config/database.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
});

// Connection pooling
prisma.$connect()
  .then(() => console.log('Database connected'))
  .catch((e) => console.error('Database connection failed:', e));

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

module.exports = prisma;
```

### 2.2 Database Migrations
```sql
-- migrations/001_initial_schema.sql
-- This will be generated by Prisma

-- Add indexes for performance
CREATE INDEX CONCURRENTLY idx_survey_submissions_date_status 
ON survey_submissions(submission_date, status);

CREATE INDEX CONCURRENTLY idx_hospital_survey_data_hospital 
ON hospital_survey_data(hospital_id);

CREATE INDEX CONCURRENTLY idx_patient_distribution_type 
ON patient_distribution(patient_type);

-- Add partitioning for large tables
CREATE TABLE survey_submissions_2024 PARTITION OF survey_submissions
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');

-- Add full-text search
CREATE INDEX idx_physicians_name_search 
ON physicians USING gin(to_tsvector('english', name));
```

## 3. Caching Strategy

### 3.1 Redis Configuration
```javascript
// config/redis.js
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
  retryDelayOnFailover: 100,
  maxRetriesPerRequest: 3,
  lazyConnect: true
});

// Cache middleware
const cacheMiddleware = (duration = 300) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    
    try {
      const cached = await redis.get(key);
      if (cached) {
        return res.json(JSON.parse(cached));
      }
      
      res.originalJson = res.json;
      res.json = async (data) => {
        await redis.setex(key, duration, JSON.stringify(data));
        res.originalJson(data);
      };
      
      next();
    } catch (error) {
      next();
    }
  };
};

module.exports = { redis, cacheMiddleware };
```

## 4. Security Implementation

### 4.1 Security Middleware
```javascript
// middleware/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const xss = require('xss-clean');

const securityMiddleware = (app) => {
  // Basic security headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "https:"],
      },
    },
  }));
  
  // Rate limiting
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  app.use('/api/', limiter);
  
  // Prevent parameter pollution
  app.use(hpp());
  
  // Prevent XSS attacks
  app.use(xss());
  
  // CORS configuration
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
};

module.exports = securityMiddleware;
```

## 5. Environment Configuration

### 5.1 Environment Variables
```bash
# .env.production
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/survey_db
DATABASE_POOL_SIZE=20

# Redis
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRES_IN=24h

# Frontend
FRONTEND_URL=https://your-domain.com

# Monitoring
ELASTICSEARCH_URL=http://localhost:9200
SENTRY_DSN=your_sentry_dsn

# File Storage
AWS_ACCESS_KEY_ID=your_aws_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
```

## 6. Deployment Configuration

### 6.1 Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/api/health || exit 1

# Start application
CMD ["npm", "start"]
```

### 6.2 Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://user:password@postgres:5432/survey_db
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=survey_db
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data
    ports:
      - "6379:6379"
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

## 7. Security Checklist

- [ ] HTTPS/TLS encryption
- [ ] JWT token validation
- [ ] Rate limiting
- [ ] Input validation and sanitization
- [ ] SQL injection prevention
- [ ] XSS protection
- [ ] CORS configuration
- [ ] Security headers
- [ ] Audit logging
- [ ] Regular security updates
- [ ] Database encryption at rest
- [ ] Backup encryption
- [ ] Access control (RBAC)
- [ ] API key management
- [ ] Vulnerability scanning

## 8. Performance Benchmarks

### Target Metrics:
- **Response Time**: < 200ms for 95th percentile
- **Throughput**: 1000+ requests/second
- **Database Queries**: < 50ms average
- **Cache Hit Rate**: > 90%
- **Uptime**: 99.9%
- **Error Rate**: < 0.1%

## 9. Migration Plan

### Phase 1: Foundation (Week 1-2)
1. Set up PostgreSQL database
2. Implement Prisma schema
3. Create basic API endpoints
4. Set up authentication

### Phase 2: Core Features (Week 3-4)
1. Implement survey submission API
2. Add data validation
3. Set up Redis caching
4. Implement audit logging

### Phase 3: Advanced Features (Week 5-6)
1. Add analytics endpoints
2. Implement file uploads
3. Set up monitoring
4. Add security measures

### Phase 4: Production (Week 7-8)
1. Deploy to production
2. Set up CI/CD
3. Configure backups
4. Performance testing

This architecture provides a robust, scalable, and secure foundation for your Physician Survey Form application in production. 