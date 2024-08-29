import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";
import { UpdateMeasureUseCase } from "../update-measure-use-case";

export function makeUpdateMeasureUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()

  const useCase = new UpdateMeasureUseCase(measuresRepository)

  return useCase
}