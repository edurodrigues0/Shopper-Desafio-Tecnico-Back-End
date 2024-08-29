import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";
import { FindMeasureByMonthAndYear } from "../find-measure-by-month-and-year-use-case";

export function makeFindMeasureByMonthAndYearUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()

  const useCase = new FindMeasureByMonthAndYear(measuresRepository)

  return useCase
}