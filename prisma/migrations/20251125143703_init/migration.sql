/*
  Warnings:

  - Added the required column `title` to the `AssignedExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AssignedExercise" ADD COLUMN     "description" TEXT,
ADD COLUMN     "rate" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "target" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
