import { Measure, Prisma } from "@prisma/client"
import { MeasuresRepository } from "@/repositories/measures-repository"
import { InvalidTypeError } from "./errors/invalid-type-error"
import { MeasuresNotFoundError } from "./errors/measure-not-found-error"

interface FetchMeasuresRequest {
  customerCode: string
  type?: string
}

interface FetchMeasuresResponse {
  measures: Measure[]
}

export class FetchMeasuresUseCase {
  constructor(
    private measuresRepository: MeasuresRepository
  ) {}

  async execute({
    customerCode,
    type,
  }: FetchMeasuresRequest): Promise<FetchMeasuresResponse> {
    if (type && (type.toUpperCase() !== "WATER" && type.toUpperCase() !== "GAS")) {
      throw new InvalidTypeError()
    }

    const measures = await this.measuresRepository.fetchByCustomerCode(customerCode, type)

    if (measures.length === 0) {
      throw new MeasuresNotFoundError()
    }

    return {
      measures,
    }
  }
}