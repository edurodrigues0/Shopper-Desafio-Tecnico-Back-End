import { describe, it, beforeEach, expect } from "vitest";
import { CustomersRepository } from "../repositories/customers-repository";
import { CreateCustomerUseCase } from "./create-customer-use-case";
import { InMemoryCustomersRepository } from "../repositories/in-memory/in-memory-customers-repository";

let customersRepository: CustomersRepository
let sut: CreateCustomerUseCase

describe('Create Customer Use Case', () => {
  beforeEach(async () => {
    customersRepository = new InMemoryCustomersRepository()

    sut = new CreateCustomerUseCase(customersRepository)
  })

  it('should be able to create customer', async () => {
    const { customer } = await sut.execute(
      {
        code: 'customer-code',
      }
    )

    expect(customer.id).toEqual(expect.any(String))
  })
})