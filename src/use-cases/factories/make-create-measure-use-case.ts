import { PrismaCustomersRepository } from "../../repositories/prisma/prisma-customers-repository";
import { PrismaMeasuresRepository } from "../../repositories/prisma/prisma-measures-repository";
import { CreateMeasureUseCase } from "../create-measure-use-case";

export function makeCreateMeasureUseCase() {
  const measuresRepository = new PrismaMeasuresRepository()
  const customersRepository = new PrismaCustomersRepository()

  const useCase = new CreateMeasureUseCase(
    measuresRepository,
    customersRepository,
  )

  return useCase
}