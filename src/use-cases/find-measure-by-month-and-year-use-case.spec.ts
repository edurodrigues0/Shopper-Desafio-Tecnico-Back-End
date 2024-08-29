import { describe, it, beforeEach, expect } from "vitest";
import { MeasuresRepository } from "../repositories/measures-repository";
import { InMemoryMeasuresRepository } from "../repositories/in-memory/in-memory-measures-repository";
import { InMemoryCustomersRepository } from "@/repositories/in-memory/in-memory-customers-repository";
import { CustomersRepository } from "@/repositories/customers-repository";
import { FindMeasureByMonthAndYear } from "./find-measure-by-month-and-year-use-case";
import { DoubleReportError } from "./errors/double-report-error";

let customersRepository: CustomersRepository
let measuresRepository: MeasuresRepository
let sut: FindMeasureByMonthAndYear

describe('Find Measure By Month and Year', () => {
  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    measuresRepository = new InMemoryMeasuresRepository()

    sut = new FindMeasureByMonthAndYear(measuresRepository)
  })

  it('should be able to find measure by month and year', async () => {
    const customer = await customersRepository.create({
      code: 'customer-code',
    })
    
    await measuresRepository.create(
      customer.code,
      {
        imageUrl: 'https://example.com/imgUrlExample',
        measureDate: new Date(),
        measureType: 'WATER',
        measureValue: 123456.8,
        customer: {
          connect: {
            id: customer.id,
          }
        }
      }
    )

    await expect(() =>
      sut.execute({
        customerCode: customer.code,
        measureDate: new Date(),
        measureType: 'WATER',
      })
    ).rejects.toBeInstanceOf(DoubleReportError)
  })
})