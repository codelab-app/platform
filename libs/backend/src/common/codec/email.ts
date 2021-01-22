import * as t from 'io-ts'
import * as Joi from 'joi'

export interface UUIDBrand {
  readonly Email: unique symbol
}

export type Email = t.Branded<string, UUIDBrand>

export const Email = t.brand(
  t.string,
  (data): data is Email => {
    const schema = Joi.string().email()

    const { error, value } = schema.validate(data)

    if (error) {
      return false
    }

    return true
  },
  'Email',
)
