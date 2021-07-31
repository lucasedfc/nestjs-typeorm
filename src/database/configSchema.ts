import * as Joi from 'joi';

const pgSchema = Joi.object({
  API_KEY: Joi.string().required(),
  PORT: Joi.number().required(),
  JWT_SECRET: Joi.string().required(),
  DATABASE_URL: Joi.string().required(),
});

export default pgSchema;
