import { MeasureType } from "@prisma/client"

import { MeasuresRepository } from "../repositories/measures-repository"
import { DoubleReportError } from "./errors/double-report-error"

interface FindMeasureByMonthAndYearRequest {
  customerCode: string
  measureType: MeasureType
  measureDate: Date,
}

interface FindMeasureByMonthAndYearResponse {
  error: Error
}

export class FindMeasureByMonthAndYear {
  constructor(
    private measuresRepository: MeasuresRepository
  ) {}

  async execute({
    customerCode,
    measureType,
    measureDate,
  }: FindMeasureByMonthAndYearRequest): Promise<FindMeasureByMonthAndYearResponse | null> {
    const measure = await this.measuresRepository.findByExactlyMonthAndYear(
      customerCode,
      measureType,
      measureDate,
    )

    if (measure) {
      throw new DoubleReportError()
    }

    return null
  }
}