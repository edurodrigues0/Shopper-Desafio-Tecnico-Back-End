/*
  Warnings:

  - You are about to drop the `meansures` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- DropForeignKey
ALTER TABLE "meansures" DROP CONSTRAINT "meansures_customer_id_fkey";

-- DropTable
DROP TABLE "meansures";

-- DropEnum
DROP TYPE "MeansureType";

-- CreateTable
CREATE TABLE "Measures" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "Measure_type" "MeasureType" NOT NULL,
    "Measure_value" DOUBLE PRECISION NOT NULL,
    "Measure_date" TIMESTAMP(3) NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Measures_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Measures" ADD CONSTRAINT "Measures_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
