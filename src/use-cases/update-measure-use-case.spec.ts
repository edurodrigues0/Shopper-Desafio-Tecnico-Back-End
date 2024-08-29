import { beforeEach, describe, expect, it } from "vitest"
import { CustomersRepository } from "@/repositories/customers-repository"
import { MeasuresRepository } from "@/repositories/measures-repository"
import { UpdateMeasureUseCase } from "./update-measure-use-case"
import { InMemoryCustomersRepository } from "@/repositories/in-memory/in-memory-customers-repository"
import { InMemoryMeasuresRepository } from "@/repositories/in-memory/in-memory-measures-repository"

let customersRepository: CustomersRepository
let measuresRepository: MeasuresRepository
let sut: UpdateMeasureUseCase

describe('Update Measure Use Case', () => {
  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()
    measuresRepository = new InMemoryMeasuresRepository()

    sut = new UpdateMeasureUseCase(measuresRepository)
  })

  it('should be able to update measure', async () => {
    const customer = await customersRepository.create({
      code: 'customer-code',
    })
    
    const measure = await measuresRepository.create(
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

    const { updatedMeasure } = await sut.execute({
      measureId: measure.id,
      data: {
        measureValue: 123456.8,
        isConfirmed: true,
      }
    })

    expect(updatedMeasure.isConfirmed).toBeTruthy()
    expect(updatedMeasure.measureValue).toEqual(123456.8)
  })
})