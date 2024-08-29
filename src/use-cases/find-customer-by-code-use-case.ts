import { Customer } from "@prisma/client"
import { CustomersRepository } from "../repositories/customers-repository"

interface FindCustomerByCodeRequest {
  customerCode: string
}

interface FindCustomerByCodeResponse {
  customer: Customer
}

export class FindCustomerByCodeUseCase {
  constructor(
    private customersRepository: CustomersRepository
  ) {}

  async execute({
    customerCode,
  }: FindCustomerByCodeRequest): Promise<FindCustomerByCodeResponse> {
    const customer = await this.customersRepository.findByCode(customerCode)

    if (!customer) {
      throw new Error()
    }

    return {
      customer,
    }
  }
}