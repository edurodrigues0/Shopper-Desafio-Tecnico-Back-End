import { Measure } from "@prisma/client";

export function MeasurePresenter(measure: Measure) {
  return {
    measure_uuid: measure.id,
    measure_datetime: measure.measureDate,
    measure_type: measure.measureType,
    has_confirmed: measure.isConfirmed,
    image_url: measure.imageUrl,
  }
}