import { Measure } from "@prisma/client";
import { MeasuresRepository } from "../repositories/measures-repository";
import { CustomersRepository } from "../repositories/customers-repository";
import { DoubleReportError } from "./errors/double-report-error";

type MeasureType = 'WATER' | 'GAS'

interface CreateMeasureUseCaseRequest {
  imageUrl: string
  customerCode: string
  measureDate: Date,
  measureType: MeasureType,
  measureValue: number,
}

interface CreateMeasureUseCaseResponse {
  measure: Measure
}

export class CreateMeasureUseCase {
  constructor(
    private measuresRepository: MeasuresRepository,
    private customersRepository: CustomersRepository,
  ) {}

  async execute({
    customerCode,
    imageUrl,
    measureDate,
    measureType,
    measureValue,
  }: CreateMeasureUseCaseRequest): Promise<CreateMeasureUseCaseResponse> {
    const customer = await this.customersRepository.findByCode(customerCode)

    if (!customer) {
      throw new Error()
    }
    
    const measure = await this.measuresRepository.create(
      customerCode,
      {
        imageUrl,
        measureValue,
        measureDate,
        measureType,
        customer: {
          connect: {
            code: customerCode,
          }
        }
      }
    )
    
    return {
      measure,
    }
  }
}