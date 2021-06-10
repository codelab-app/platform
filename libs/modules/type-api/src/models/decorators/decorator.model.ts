import { createUnionType } from '@nestjs/graphql'
import { z } from 'zod'
import {
  ArrayLengthValidator,
  arrayLengthValidatorSchema,
} from './array-length-validator'
import { MinMaxValidator, minMaxValidatorSchema } from './min-max-validator'
import {
  RequiredValidator,
  requiredValidatorSchema,
} from './required-validator'

/** An union type for all the decorators we can have */
export const Decorator = createUnionType({
  name: 'Decorator',
  types: () => [ArrayLengthValidator, MinMaxValidator, RequiredValidator],
})

/** An union type for all the decorators we can have */
export type Decorator = typeof Decorator

export const decoratorSchema: z.ZodSchema<Decorator> = z.lazy(() =>
  z.union([
    arrayLengthValidatorSchema,
    minMaxValidatorSchema,
    requiredValidatorSchema,
  ]),
)
