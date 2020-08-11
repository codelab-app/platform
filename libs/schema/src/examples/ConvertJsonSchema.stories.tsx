import { createMongooseSchema } from 'convert-json-schema-to-mongoose'
import mongoose from 'mongoose'

const refs = {
  yep: {
    type: 'string',
    pattern: '^\\d{3}$',
  },
  idSpec: {
    type: 'object',
    properties: {
      id: {
        $ref: 'yep',
      },
    },
  },
}

// example schema to convert to mongoose schema
const schema = {
  type: 'object',
  properties: {
    id: {
      $ref: 'yep',
    },
    address: {
      type: 'object',
      properties: {
        street: { type: 'string', default: '44', pattern: '^\\d{2}$' },
        houseColor: {
          type: 'string',
          default: '[Function=Date.now]',
          format: 'date-time',
        },
      },
    },
  },
}

export default {
  title: 'ConvertSchema',
}

export const Default = () => {
  const mongooseSchema = createMongooseSchema(refs, schema)

  // Alternative syntax, which makes it so you can convert many at one time.

  // var jsonSchemas = {commonRef: ..., good: ..., schema: ..., naming: ...}
  // var convert = createMongooseSchema(jsonSchemas)
  // var schemaNames = ['good', 'schema', 'naming']
  // var schemas = _.map(schemaNames, (name) => { return jsonSchemas[name] })
  // var mongooseSchemas = _.zipObject(schemaNames, schemas.reduce((mongooseSchemas, schema) => {
  //     return mongooseSchemas.concat(convert(schema))
  // }, []))

  console.dir(mongooseSchema, { depth: null })

  const Schema = new mongoose.Schema(mongooseSchema)

  console.log(Schema)

  return null
}
