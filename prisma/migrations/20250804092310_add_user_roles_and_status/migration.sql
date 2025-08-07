-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('SUPERADMIN', 'SALESPERSON');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('PENDING', 'ACTIVE');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'SALESPERSON',
ADD COLUMN     "status" "public"."Status" NOT NULL DEFAULT 'PENDING';
