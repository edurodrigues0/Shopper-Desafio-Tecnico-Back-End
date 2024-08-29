import { describe, it, beforeEach, expect } from "vitest";
import { MeasuresRepository } from "../repositories/measures-repository";
import { CreateMeasureUseCase } from "./create-measure-use-case";
import { InMemoryMeasuresRepository } from "../repositories/in-memory/in-memory-measures-repository";
import { CustomersRepository } from "../repositories/customers-repository";
import { InMemoryCustomersRepository } from "../repositories/in-memory/in-memory-customers-repository";
import { FetchMeasuresUseCase } from "./fetch-measures-use-case";
import { MeasuresNotFoundError } from "./errors/measure-not-found-error";

let measuresRepository: MeasuresRepository
let customersRepository: CustomersRepository
let sut: FetchMeasuresUseCase

describe('Fetch Measure Use Case', () => {
  beforeEach(async () => {
    measuresRepository = new InMemoryMeasuresRepository()
    customersRepository = new InMemoryCustomersRepository()

    sut = new FetchMeasuresUseCase(measuresRepository)

    await customersRepository.create({
      id: 'customer-id',
      code: 'customer-code',
    })
  })

  it('should be able to fetch measures', async () => {
    for (let i = 1; i <= 5; i++) {
      await measuresRepository.create(
        'customer-id',
        {
          imageUrl: 'https://example.com/imgUrlExample',
          measureDate: new Date(`2024-${i+1}-10`),
          measureType: 'WATER',
          measureValue: 123456.8,
          customer: {
            connect: {
              id: 'customer-id',
            }
          }
        }
      )
    }

    const { measures } = await sut.execute({
      customerCode: 'customer-id'
    })

    expect(measures).toHaveLength(5)
  })

  it('should not be able to search for non-existing measures', async () => {
    await customersRepository.create({
      id: 'customer-id',
      code: 'customer-code',
    })

    expect(async () =>
      sut.execute({
        customerCode: 'customer-code'
      })
    ).rejects.toBeInstanceOf(MeasuresNotFoundError)
  })
})