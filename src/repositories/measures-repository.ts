import { Measure, MeasureType, Prisma } from "@prisma/client";
import { DoubleReportError } from "@/use-cases/errors/double-report-error";

export interface MeasuresRepository {
  /**
   * @param {string} customerCode
   * @param {Prisma.MeasureCreateInput} data
   */
  create(
    customerCode: string,
    data: Prisma.MeasureCreateInput
  ): Promise<Measure>

  findById(measureId: string): Promise<Measure | undefined>
  fetchByCustomerCode(
    customerCode: string,
    type?: string,
  ): Promise<Measure[]>
  findByExactlyMonthAndYear(
    customerCode: string,
    measureType: MeasureType,
    measureDate: Date,
  ): Promise<DoubleReportError | null>
  update(
    measureId: string,
    data: Pick<Prisma.MeasureUpdateInput, "isConfirmed" | "measureValue">
  ): Promise<Measure | null>
}