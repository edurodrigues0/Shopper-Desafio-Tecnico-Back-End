import path from "node:path";
import fastify from "fastify";
import staticPlugin from "@fastify/static";

import { ZodError } from "zod";
import { env } from "./env";
import { AppRoutes } from "./http/controllers/app.routes";

export const app = fastify()

app.register(staticPlugin, {
  root: path.join(__dirname, '../tmp'),
  prefix: '/tmp'
})

app.register(AppRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      error_code: 'INVALID DATA',
      error_description: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  }

  return reply.status(500).send({
    error_code: 'INTERNAL SERVER ERROR',
    error_description: error.message,
  })
})