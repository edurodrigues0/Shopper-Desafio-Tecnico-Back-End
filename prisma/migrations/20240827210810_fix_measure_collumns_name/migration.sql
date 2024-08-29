/*
  Warnings:

  - You are about to drop the column `Measure_date` on the `Measures` table. All the data in the column will be lost.
  - You are about to drop the column `Measure_type` on the `Measures` table. All the data in the column will be lost.
  - You are about to drop the column `Measure_value` on the `Measures` table. All the data in the column will be lost.
  - Added the required column `measure_date` to the `Measures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_type` to the `Measures` table without a default value. This is not possible if the table is not empty.
  - Added the required column `measure_value` to the `Measures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Measures" DROP COLUMN "Measure_date",
DROP COLUMN "Measure_type",
DROP COLUMN "Measure_value",
ADD COLUMN     "measure_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "measure_type" "MeasureType" NOT NULL,
ADD COLUMN     "measure_value" DOUBLE PRECISION NOT NULL;
