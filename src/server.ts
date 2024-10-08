import { app } from "./app";
import { env } from "./env";

app.listen({
  port: 3333,
  host: '0.0.0.0',
}).then(() => {
  console.log(`HTTP Server Running On Port ${env.PORT}!`)
})