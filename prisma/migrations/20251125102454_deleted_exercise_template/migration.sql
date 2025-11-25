/*
  Warnings:

  - You are about to drop the column `templateId` on the `AssignedExercise` table. All the data in the column will be lost.
  - You are about to drop the `ExerciseTemplate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AssignedExercise" DROP CONSTRAINT "AssignedExercise_templateId_fkey";

-- AlterTable
ALTER TABLE "AssignedExercise" DROP COLUMN "templateId";

-- DropTable
DROP TABLE "ExerciseTemplate";
