import { describe, it, beforeEach, expect } from "vitest";
import { MeasuresRepository } from "../repositories/measures-repository";
import { CreateMeasureUseCase } from "./create-measure-use-case";
import { InMemoryMeasuresRepository } from "../repositories/in-memory/in-memory-measures-repository";
import { CustomersRepository } from "../repositories/customers-repository";
import { InMemoryCustomersRepository } from "../repositories/in-memory/in-memory-customers-repository";

let measuresRepository: MeasuresRepository
let customersRepository: CustomersRepository
let sut: CreateMeasureUseCase

describe('Create Measure Use Case', () => {
  beforeEach(async () => {
    measuresRepository = new InMemoryMeasuresRepository()
    customersRepository = new InMemoryCustomersRepository()

    sut = new CreateMeasureUseCase(
      measuresRepository,
      customersRepository,
    )
  })

  it('should be able to create measure', async () => {
    const customer = await customersRepository.create({
      code: 'customer-code'
    })

    const { measure } = await sut.execute(
      {
        imageUrl: 'https://example.com/imgUrlExample',
        measureDate: new Date(),
        measureType: 'WATER',
        measureValue: 123456.8,
        customerCode: customer.code,
      }
    )
    
    expect(measure.id).toEqual(expect.any(String))
    expect(measure.isConfirmed).toBe(false)
  })
})