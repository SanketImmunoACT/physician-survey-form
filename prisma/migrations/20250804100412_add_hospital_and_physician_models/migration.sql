-- CreateTable
CREATE TABLE "public"."Hospital" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "requestedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hospital_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Physician" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'PENDING',
    "requestedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Physician_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_name_key" ON "public"."Hospital"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Physician_name_key" ON "public"."Physician"("name");
