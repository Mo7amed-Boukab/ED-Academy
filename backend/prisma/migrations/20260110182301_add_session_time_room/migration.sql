/*
Warnings:

- Added the required column `endTime` to the `Session` table without a default value. This is not possible if the table is not empty.
- Added the required column `room` to the `Session` table without a default value. This is not possible if the table is not empty.
- Added the required column `startTime` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Session"
ADD COLUMN "startTime" TEXT NOT NULL DEFAULT '08:00',
ADD COLUMN "endTime" TEXT NOT NULL DEFAULT '10:00',
ADD COLUMN "room" TEXT NOT NULL DEFAULT 'TBD';

-- Remove default values after adding columns
ALTER TABLE "Session"
ALTER COLUMN "startTime"
DROP DEFAULT,
ALTER COLUMN "endTime"
DROP DEFAULT,
ALTER COLUMN "room"
DROP DEFAULT;