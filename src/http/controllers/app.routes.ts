import { uploadRoute } from "./upload";
import { FastifyInstance } from "fastify";
import { fetchMeasureRoute } from "./fetch-measures";
import { updateMeasureRoute } from "./update-measure";

export async function AppRoutes(app: FastifyInstance) {
  app.register(uploadRoute)
  app.register(fetchMeasureRoute)
  app.register(updateMeasureRoute)
}