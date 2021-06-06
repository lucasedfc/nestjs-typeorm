import * as Joi from 'joi';

const pgSchema = Joi.object({
  API_KEY: Joi.number().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().required(),
  PORT: Joi.number().required(),
});

export default pgSchema;
