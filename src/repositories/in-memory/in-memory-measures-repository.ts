import { randomUUID } from "node:crypto";
import { Customer, Measure, Prisma } from "@prisma/client";
import { MeasuresRepository } from "../measures-repository";
import { DoubleReportError } from "@/use-cases/errors/double-report-error";

export class InMemoryMeasuresRepository implements MeasuresRepository {
  public items: Measure[] = []
  public customers: Customer[] = []

  async create(
    _customerCode: string,
    data: Prisma.MeasureCreateInput
  ): Promise<Measure> {
    const measure: Measure = {
      id: data.id ?? randomUUID(),
      imageUrl: data.imageUrl,
      measureType: data.measureType,
      measureDate: new Date(data.measureDate),
      measureValue: data.measureValue,
      isConfirmed: data.isConfirmed ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
      customerId: data.customer.connect?.id!,
    }

    this.items.push(measure)

    return measure
  }

  async findById(measureId: string): Promise<Measure | undefined> {
    const measure = this.items.find((item) => item.id === measureId)

    if (!measure) {
      return undefined
    }

    return measure
  }

  async fetchByCustomerCode(customerCode: string): Promise<Measure[]> {
    console.log(customerCode)
    const measures = this.items.filter((item) => item.customerId === customerCode)

    return measures
  }

  async findByExactlyMonthAndYear(
    customerCode: string,
    measureType: "WATER" | "GAS",
    measureDate: Date
  ): Promise<DoubleReportError | null> {
    const measure = this.items.find(
      (item) => (item.measureType === measureType)
      && (item.measureDate.getMonth() === measureDate.getMonth())
      && (item.measureDate.getFullYear() === measureDate.getFullYear())
    )

    if (measure) {
      return new DoubleReportError()
    }

    return null 
  }

  async update(
    measureId: string,
    data: Pick<Prisma.MeasureUpdateInput, "isConfirmed" | "measureValue">
  ): Promise<Measure | null> {
    const measureIndex = this.items.findIndex((item) => item.id === measureId)

    if (measureIndex < 0) {
      return null
    }

    const currentMeasure = this.items[measureIndex];

    const updatedMeasure = {
      ...currentMeasure,
      measureValue: typeof data.measureValue === 'number' ? data.measureValue : currentMeasure.measureValue,
      isConfirmed: typeof data.isConfirmed === 'boolean' ? data.isConfirmed : currentMeasure.isConfirmed,
    };

    return updatedMeasure
  }
}