/*
  Warnings:

  - The values [CANCEL] on the enum `ExerciseStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ExerciseStatus_new" AS ENUM ('APPROVE', 'DONE', 'PENDING');
ALTER TABLE "public"."AssignedExercise" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AssignedExercise" ALTER COLUMN "status" TYPE "ExerciseStatus_new" USING ("status"::text::"ExerciseStatus_new");
ALTER TYPE "ExerciseStatus" RENAME TO "ExerciseStatus_old";
ALTER TYPE "ExerciseStatus_new" RENAME TO "ExerciseStatus";
DROP TYPE "public"."ExerciseStatus_old";
ALTER TABLE "AssignedExercise" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
