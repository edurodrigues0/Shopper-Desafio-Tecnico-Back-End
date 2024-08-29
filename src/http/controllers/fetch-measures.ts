import { z } from 'zod';
import { FastifyInstance } from 'fastify';
import { makeFetchMeasuresUseCase } from '@/use-cases/factories/make-fetch-measures-use-case';
import { MeasurePresenter } from '../presenter/measure-presenter';
import { InvalidTypeError } from '@/use-cases/errors/invalid-type-error';
import { MeasuresNotFoundError } from '@/use-cases/errors/measure-not-found-error';

export async function fetchMeasureRoute(app: FastifyInstance) {
  app.get('/:customerCode/list', async (request, reply) => {
    const listMeasureParamsSchema = z.object({
      customerCode: z.coerce.string(),
    });

    const listMeasureQuerySchema = z.object({
      type: z.string().optional()
    })

    const { customerCode } = listMeasureParamsSchema.parse(request.params);
    const { type } = listMeasureQuerySchema.parse(request.query)

    try {
      const fetchMeasuresUseCase = makeFetchMeasuresUseCase()

      const { measures } = await fetchMeasuresUseCase.execute({
        customerCode,
        type,
      })

      return reply.code(200).send({
        customerCode,
        measures: measures.map((measure) => MeasurePresenter(measure)),
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
    }
  });
}
