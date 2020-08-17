import { IDeepEntry } from 'deepdash-es/IDeepEntry'
import { findDeep } from 'deepdash-es/standalone'
import { JSONSchema7, JSONSchema7Definition } from 'json-schema'
import { reduce } from 'lodash'
import * as mongoose from 'mongoose'

type JSONSchema7Property = {
  [name: string]: JSONSchema7Definition
}

export class JsonSchema {
  schema: JSONSchema7

  models: Array<mongoose.Model<any>> = []

  schemas: { [model: string]: mongoose.Schema } = {}

  constructor(schema: JSONSchema7) {
    this.schema = schema
    this.parseRefs(schema)
  }

  private parseRefs(schema: JSONSchema7) {
    const { properties, definitions } = schema

    if (!properties) return

    for (const [model, definition] of Object.entries(properties)) {
      // Find ref
      const { parent, value: ref, ...rest }: IDeepEntry = findDeep(
        definition,
        (val: any, key: any, parentValue: any) => key === '$ref',
      )

      const jsonSchemaProperty: JSONSchema7Property = JsonSchema.findProperty(
        ref,
        definitions,
      )

      const mongooseSchema: mongoose.Schema = JsonSchema.mongooseSchema(
        jsonSchemaProperty,
      )

      this.schemas = {
        ...this.schemas,
        [Object.keys(jsonSchemaProperty)[0]]: mongooseSchema,
      }
    }
  }

  static mongooseSchema(property: JSONSchema7Property): mongoose.Schema {
    const mongooseSchemaProperty: mongoose.SchemaDefinition = JsonSchema.mongooseSchemaDefinition(
      property,
    )

    // console.log(mongooseSchemaProperty)

    return new mongoose.Schema(mongooseSchemaProperty)
  }

  static mongooseSchemaDefinition(
    property: JSONSchema7Property,
  ): mongoose.SchemaDefinition {
    const schemaDefinition = Object.values(property)[0] as JSONSchema7

    const { properties } = schemaDefinition

    return reduce(
      properties,
      (acc, propertyDefinition, field) => {
        return {
          ...acc,
          [field]: JsonSchema.parseSchemaDefinition(
            [field, propertyDefinition],
            schemaDefinition,
          ),
        }
      },
      {},
    )
  }

  static parseSchemaDefinition(
    [field, propertyDefinition]: [string, JSONSchema7Definition],
    schemaDefinition: JSONSchema7,
  ): mongoose.SchemaTypeOpts<any> | mongoose.Schema | mongoose.SchemaType {
    // Special case for array
    const type = JsonSchema.parseType(propertyDefinition)

    if (type === mongoose.Schema.Types.Array) {
      return [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: JsonSchema.parseItemRef(propertyDefinition),
        },
      ]
    }

    return {
      type: JsonSchema.parseType(propertyDefinition),
      unique: JsonSchema.parseUnique(propertyDefinition),
      required: JsonSchema.parseRequired(field, schemaDefinition),
    }
  }

  static parseItemRef(propertyDefinition: JSONSchema7Definition): string {
    const items = (propertyDefinition as JSONSchema7)?.items as JSONSchema7

    if (!items.$ref) {
      throw new Error('Missing items ref')
    }

    return items.$ref
  }

  static parseType(
    propertyDefinition: JSONSchema7Definition,
  ): typeof mongoose.SchemaType {
    const { type } = propertyDefinition as JSONSchema7

    switch (type) {
      case 'string':
        return mongoose.Schema.Types.String
      case 'number':
        return mongoose.Schema.Types.Number
      case 'integer':
        return mongoose.Schema.Types.Number
      case 'boolean':
        return mongoose.Schema.Types.Boolean
      case 'object':
        return mongoose.Schema.Types.ObjectId
      case 'array':
        return mongoose.Schema.Types.Array
      case 'null':
        return mongoose.Schema.Types.Boolean
      default:
        return mongoose.Schema.Types.String
    }
  }

  static parseUnique(propertyDefinition: JSONSchema7Definition): boolean {
    const { uniqueItems } = propertyDefinition as JSONSchema7

    return uniqueItems ?? false
  }

  static parseRequired(
    field: string,
    schemaDefinition: JSONSchema7Definition,
  ): boolean {
    const { required } = schemaDefinition as JSONSchema7

    return required?.includes(field) ?? false
  }

  static findProperty(
    ref: string | undefined,
    definitions?: { [key: string]: JSONSchema7Definition },
  ): JSONSchema7Property {
    const { parent, ...rest }: IDeepEntry = findDeep(
      definitions,
      (value: any, key: any, parentValue: any) =>
        key === '$id' && value === ref,
    )

    const { context } = rest as any

    if (!context.parent.key) {
      return {}
    }

    return {
      [context.parent.key as string]: parent as JSONSchema7,
    }
  }
}
