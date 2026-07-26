import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  POSTGRES_HOST: z.string().nonempty(),
  POSTGRES_PORT: z.coerce.number().int(),
  POSTGRES_USER: z.string().nonempty(),
  POSTGRES_PASSWORD: z.string().nonempty(),
  POSTGRES_DB: z.string().nonempty(),
  URL_API: z.url({
    error: 'Variável de ambiente URL_API deve ser uma URL válida.',
  }),
  PORT: z.preprocess(
    (value) => (value === '' ? undefined : value),
    z.coerce.number().int().default(3000),
  ),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  throw new Error(
    `Variáveis de ambiente inválidas. \n${z.prettifyError(parsed.error)}`,
  );
}

export const env = {
  port: parsed.data.PORT,
  urlApi: parsed.data.URL_API,
  postgres: {
    host: parsed.data.POSTGRES_HOST,
    port: parsed.data.POSTGRES_PORT,
    user: parsed.data.POSTGRES_USER,
    password: parsed.data.POSTGRES_PASSWORD,
    database: parsed.data.POSTGRES_DB,
  },
};
