import { describe, it, beforeEach, expect } from "vitest";
import { CreateMeasureUseCase } from "./create-measure-use-case";
import { CustomersRepository } from "../repositories/customers-repository";
import { InMemoryCustomersRepository } from "../repositories/in-memory/in-memory-customers-repository";
import { FindCustomerByCodeUseCase } from "./find-customer-by-code-use-case";

let customersRepository: CustomersRepository
let sut: FindCustomerByCodeUseCase

describe('Find Customer By Code Use Case', () => {
  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()

    sut = new FindCustomerByCodeUseCase(customersRepository)
  })

  it('should be able to find customer by code', async () => {
    await customersRepository.create({
      code: 'customer-code'
    })

    const { customer } = await sut.execute({customerCode: 'customer-code'})
    
    expect(customer.id).toEqual(expect.any(String))
    expect(customer.code).toEqual('customer-code')
  })

  it('should not be able to find customer by wrong code', async () => {
    await expect(() =>
      sut.execute({
        customerCode: 'wrong-code',
      })
    ).rejects.toBeInstanceOf(Error)
  })
})