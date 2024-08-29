import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";
import { FetchMeasuresUseCase } from "../fetch-measures-use-case";

export function makeFetchMeasuresUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()

  const useCase = new FetchMeasuresUseCase(measuresRepository)

  return useCase
}