import * as t from 'io-ts'
import Joi from 'joi'

export interface UUIDBrand {
  readonly Email: unique symbol
}

export type Email = t.Branded<string, UUIDBrand>

export const Email = t.brand(
  t.string,
  (value): value is Email => {
    const schema = Joi.string().email()

    const results = schema.validate(value)

    console.log(results)

    return true
  },
  'Email',
)
