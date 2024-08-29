import { Prisma, Customer } from "@prisma/client";
import { CustomersRepository } from "../customers-repository";
import { prisma } from "../../lib/prisma";


export class PrismaCustomersRepository implements CustomersRepository {
  async create(data: Prisma.CustomerCreateInput): Promise<Customer> {
    const customer = await prisma.customer.create({
      data,
    })

    return customer
  }

  async findByCode(customerCode: string): Promise<Customer | undefined> {
    const customer = await prisma.customer.findUnique({
      where: {
        code: customerCode,
      }
    })

    if (!customer) {
      return undefined
    }

    return customer
  }
}