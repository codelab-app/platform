import { reduce } from 'lodash'
import * as mongoose from 'mongoose'
import {
  PropsSchema,
  PropsSchemaOptions,
} from '@codelab/shared/interface/model'

export const getSchemaType = (
  propValue: PropsSchemaOptions,
): mongoose.SchemaTypeOpts<any> => {
  const { type } = propValue

  if ('enum' in propValue) {
    return { type: mongoose.Schema.Types.String, enum: propValue.enum }
  }

  if ('ref' in propValue) {
    return { type: mongoose.Schema.Types.ObjectId, ref: propValue.ref }
  }

  if (type === 'string') {
    return { type: mongoose.Schema.Types.String }
  }

  if (type === 'number') {
    return { type: mongoose.Schema.Types.Number }
  }

  if (type === 'boolean') {
    return { type: mongoose.Schema.Types.Boolean }
  }

  return { type: mongoose.Schema.Types.String }
}

/**
 * Transform props to mongoose Schema
 */
export const schemaPropsFactory = (
  props?: PropsSchema,
): mongoose.SchemaDefinition => {
  const schemaDefinition: mongoose.SchemaDefinition = reduce<
    PropsSchema,
    mongoose.SchemaDefinition
  >(
    props,
    (
      mongooseSchemaDefinition: mongoose.SchemaDefinition,
      propValue: PropsSchema[keyof PropsSchema],
      propKey: keyof PropsSchema,
    ) => {
      return {
        ...mongooseSchemaDefinition,
        [propKey]: getSchemaType(propValue),
      }
    },
    {},
  )

  return schemaDefinition
}
