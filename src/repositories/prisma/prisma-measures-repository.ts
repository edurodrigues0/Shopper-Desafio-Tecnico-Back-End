import { Prisma, Measure } from "@prisma/client";
import { MeasuresRepository } from "../measures-repository";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";
import { DoubleReportError } from "@/use-cases/errors/double-report-error";

export class PrismaMeasuresRepository implements MeasuresRepository {
  async create(
    customerCode: string,
    data: Prisma.MeasureCreateInput
  ): Promise<Measure> {
    const measure = prisma.measure.create({
      data: {
        customer: {
          connect: {
            code: customerCode,
          },
        },
        imageUrl: data.imageUrl,
        measureType: data.measureType,
        measureDate: data.measureDate,
        measureValue: data.measureValue,
      },
    })

    return measure
  }

  async findById(measureId: string): Promise<Measure | undefined> {
    const measure = await prisma.measure.findUnique({
      where: {
        id: measureId,
      }
    })

    if (!measure) {
      return undefined
    }

    return measure
  }

  async fetchByCustomerCode(customerCode: string, type?: "WATER" | "GAS"): Promise<Measure[]> {
    const normalizedType = type ? type.toUpperCase() as "WATER" | "GAS" : undefined
    
    const measures = await prisma.measure.findMany({
      where: {
        customer: {
          code: customerCode,
        },
        measureType: normalizedType,
      },
    })

    return measures
  }

  async findByExactlyMonthAndYear(
    customerCode: string,
    measureType: "WATER" | "GAS",
    measureDate: Date
  ): Promise<Error | null> {
    const date = dayjs(measureDate)
    const year = date.year()
    const month = date.month() + 1

    const measure = await prisma.measure.findFirst({
      where: {
        customer: {
          code: customerCode,
        },
        measureType,
        measureDate: {
          gte: new Date(year, month - 1, 1),
          lt: new Date(year, month, 1),
        }
      }
    })

    if (measure) {
      return new DoubleReportError()
    }

    return null 
  }

  async update(
    measureId: string,
    data: Prisma.MeasureUncheckedUpdateInput
  ): Promise<Measure> {
    const measure = await prisma.measure.update({
      where: {
        id: measureId,
      },
      data,
    })

    return measure
  }
}