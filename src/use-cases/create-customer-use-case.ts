import { Customer } from "@prisma/client"
import { CustomersRepository } from "../repositories/customers-repository"

interface CreateCustomerUseCaseRequest {
  code: string
}

interface CreateCustomerUseCaseResponse {
  customer: Customer
}

export class CreateCustomerUseCase {
  constructor(
    private customersRepository: CustomersRepository,
  ) {}

  async execute({
    code,
  }: CreateCustomerUseCaseRequest): Promise<CreateCustomerUseCaseResponse> {
    
    const customer = await this.customersRepository.create({
      code,
    })
    
    return {
      customer
    }
  }
}