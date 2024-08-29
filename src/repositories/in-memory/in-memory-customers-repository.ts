import { randomUUID } from "node:crypto";
import { Customer, Prisma } from "@prisma/client";
import { CustomersRepository } from "../customers-repository";

export class InMemoryCustomersRepository implements CustomersRepository {
  public items: Customer[] = []

  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    const customer: Customer = {
      id: data.id ?? randomUUID(),
      code: data.code,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    
    this.items.push(customer)

    return customer
  }

  async findByCode(customerCode: string): Promise<Customer | undefined> {
    const customer = this.items.find((item) => item.code === customerCode)

    if (!customer) {
      return undefined
    }

    return customer
  }
}