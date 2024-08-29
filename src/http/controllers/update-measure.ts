import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { MeasurePresenter } from '../presenter/measure-presenter';
import { InvalidTypeError } from '@/use-cases/errors/invalid-type-error';
import { MeasuresNotFoundError } from '@/use-cases/errors/measure-not-found-error';
import { makeUpdateMeasureUseCase } from '@/use-cases/factories/make-update-measure-use-case';
import { ConfirmationDuplicateError } from '@/use-cases/errors/confirmation-duplicate-error';

export async function updateMeasureRoute(app: FastifyInstance) {
  app.patch('/confirm', async (request, reply) => {
    const updateMeasureBodySchema = z.object({
      measure_uuid: z.string().uuid(),
      confirmed_value: z.number(),
    });

    const { confirmed_value, measure_uuid } = updateMeasureBodySchema.parse(request.body);

    try {
      const updateMeasureUseCase = makeUpdateMeasureUseCase()

      const { updatedMeasure } = await updateMeasureUseCase.execute({
        measureId: measure_uuid,
        data: {
          measureValue: confirmed_value,
          isConfirmed: true,
        }
      })

      return reply.code(200).send({
        success: updatedMeasure.isConfirmed,
      })
    } catch (err) {
      if (err instanceof InvalidTypeError) {
        return reply.status(400).send({
          error_code: err.message,
          error_description: "Tipo de medição não permitida",
        });
      }

      if (err instanceof MeasuresNotFoundError) {
        return reply.status(404).send({
          error_code: err.message,
          error_description: "Nenhuma leitura encontrada",
        })
      }

      if (err instanceof ConfirmationDuplicateError) {
        return reply.code(409).send({
          error_code: err.message,
          error_description: "Leitura do mês já realizada."
        })
      }
    }
  });
}
