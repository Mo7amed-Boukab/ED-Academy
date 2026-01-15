-- CreateEnum
CREATE TYPE "Justification" AS ENUM ('JUSTIFIED', 'NOT_JUSTIFIED');

-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN "justification" "Justification";