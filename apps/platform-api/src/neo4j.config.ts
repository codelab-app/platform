import { registerAs } from '@nestjs/config'
import * as Joi from 'joi'

export const neo4jConfig = registerAs('neo4j', () => ({
  password: process.env.NEO4J_PASSWORD,
  uri: process.env.NEO4J_URI,
  user: process.env.NEO4J_USER,
}))

export const neo4jValidation = Joi.object({
  NEO4J_PASSWORD: Joi.number(),
  NEO4J_URI: Joi.string(),
  NEO4J_USER: Joi.string(),
})
