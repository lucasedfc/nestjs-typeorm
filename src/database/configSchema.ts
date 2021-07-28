import * as Joi from 'joi';

const pgSchema = Joi.object({
  API_KEY: Joi.string().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
});

export default pgSchema;
