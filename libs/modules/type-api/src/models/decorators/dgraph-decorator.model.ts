import { z } from 'zod'
import { DgraphArrayLengthValidator } from './array-length-validator'
import { DgraphMinMaxValidator } from './min-max-validator'
import { DgraphRequiredValidator } from './required-validator'

export type DgraphDecorator =
  | DgraphArrayLengthValidator
  | DgraphMinMaxValidator
  | DgraphRequiredValidator

export const allDgraphDecorators = [
  DgraphArrayLengthValidator,
  DgraphMinMaxValidator,
  DgraphRequiredValidator,
]

export const dgraphDecoratorSchema = z.union([
  DgraphArrayLengthValidator.Schema,
  DgraphMinMaxValidator.Schema,
  DgraphRequiredValidator.Schema,
])

export const decoratorDgraphTypes = [
  DgraphArrayLengthValidator.Metadata.modelName,
  DgraphMinMaxValidator.Metadata.modelName,
  DgraphRequiredValidator.Metadata.modelName,
]

export type DecoratorDgraphTypes = typeof decoratorDgraphTypes[number]
