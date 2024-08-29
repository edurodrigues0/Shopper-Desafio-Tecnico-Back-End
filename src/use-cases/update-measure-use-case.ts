import { Measure, Prisma } from "@prisma/client";
import { MeasuresRepository } from "@/repositories/measures-repository";
import { MeasuresNotFoundError } from "./errors/measure-not-found-error";
import { ConfirmationDuplicateError } from "./errors/confirmation-duplicate-error";

interface UpdateMeasureRequest {
  measureId: string,
  data: Pick<Prisma.MeasureUpdateInput, "isConfirmed" | "measureValue">,
}

interface UpdateMeasureResponse {
  updatedMeasure: Measure
}
export class UpdateMeasureUseCase {
  constructor(
    private measuresRepository: MeasuresRepository
  ) {}

  async execute({
    measureId,
    data,
  }: UpdateMeasureRequest): Promise<UpdateMeasureResponse> {
    const measure = await this.measuresRepository.findById(measureId)

    if (!measure) {
      throw new MeasuresNotFoundError()
    }

    if (measure.isConfirmed === true) {
      throw new ConfirmationDuplicateError()
    }

    const updatedMeasure = await this.measuresRepository.update(measureId, data)

    if (!updatedMeasure) {
      throw new Error()
    }

    return {
      updatedMeasure
    }
  }
}