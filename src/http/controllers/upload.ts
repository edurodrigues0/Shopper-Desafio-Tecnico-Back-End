import { randomUUID } from 'node:crypto';

import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { GoogleGenerativeAIFetchError } from '@google/generative-ai';

import { genAi } from '@/lib/genAi';
import { makeFindMeasureByMonthAndYearUseCase } from '@/use-cases/factories/make-find-measure-by-month-and-year-use-case';
import { makeCreateMeasureUseCase } from '@/use-cases/factories/make-create-measure-use-case';
import { DoubleReportError } from '@/use-cases/errors/double-report-error';
import { uploadImageAndGetUrl } from '@/utils/upload-image-and-get-url';
import { generatePresignedUrl } from '@/utils/generate-presigned-url';

export async function uploadRoute(app: FastifyInstance) {
  app.post('/upload', async (request, reply) => {
    const uploadBodySchema = z.object({
      image: z.string()
        .refine(value => {
          return /^data:image\/(jpeg|png);base64,/.test(value);
        }, {
          message: 'Invalid base64 format. Supported formats: JPEG or PNG'
        })
        .transform(value => {
          const base64Data = value.replace(/^data:image\/(jpeg|png);base64,/, '');
          return Buffer.from(base64Data, 'base64');
        }),
      customer_code: z.string().min(1, { message: 'Customer code is required' }),
      measure_datetime: z.string().refine(value => !isNaN(Date.parse(value)), {
        message: 'Invalid date format'
      }),
      measure_type: z.enum(["WATER", "GAS"], {
        message: 'Invalid measure type try WATER or GAS'
      })
    })

    const { 
      image,
      customer_code,
      measure_datetime,
      measure_type
    } = uploadBodySchema.parse(request.body)

    try {
      const findMeasureByMonthAndYearUseCase = makeFindMeasureByMonthAndYearUseCase()
      const createMeasureUseCase = makeCreateMeasureUseCase()

      await findMeasureByMonthAndYearUseCase.execute({
        customerCode: customer_code,
        measureType: measure_type,
        measureDate: new Date(measure_datetime),
      })

      const prompt = `Extract and return ONLY the numerical value displayed on the meter in the image.`
      const img = {
        inlineData: {
          data: image.toString("base64"),
          mimeType: "image/png",
        },
      }

      const model = genAi.getGenerativeModel({ model: "gemini-1.5-pro" })

      const result = await model.generateContent([prompt, img])

      const measureValue = parseFloat(result.response.text())

      if (isNaN(measureValue)) {
        return reply.status(500).send({
          error_code: "INVALID_MEASURE",
          error_description: "The AI model failed to extract a valid numerical value from the image."
        })
      }

      const {
        publicUrl,
        temporaryLink,
      } = await uploadImageAndGetUrl(image, randomUUID(), img.inlineData.mimeType)
      
      const { measure } = await createMeasureUseCase.execute({
        measureValue,
        customerCode: customer_code, 
        imageUrl: publicUrl,
        measureDate: new Date(measure_datetime),
        measureType: measure_type,
      })

      return reply.code(200).send({
        image_url: temporaryLink,
        measure_uuid: measure.id,
        measure_value: measure.measureValue,
      })
    } catch (err) {
      if (err instanceof DoubleReportError) {
        return reply.status(409).send({
          error_code: err.message,
          error_description: "Leitura do mês já realizada",
        })
      }

      if (err instanceof GoogleGenerativeAIFetchError) {
        return reply.code(500).send({
          erro_code: "INTERNAL_SERVE_ERROR",
          error_descriprion: err
        })
      }

      console.log(err)
    }
  });
}
