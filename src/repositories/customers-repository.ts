import { Customer, Prisma } from '@prisma/client'

export interface CustomersRepository {
  create(data: Prisma.CustomerCreateInput): Promise<Customer>
  findByCode(customerCode: string): Promise<Customer | undefined>
}