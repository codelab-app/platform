/**
 * @jest-environment node
 */
import mongoose from 'mongoose'
import { JSONSchema7 } from 'json-schema'
import { Schema } from './Schema'

const baseSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
  type: 'object',
}

describe('ComponentSchema', () => {
  const schema: JSONSchema7 = {
    ...baseSchema,
    definitions: {
      user: {
        type: 'object',
        properties: {
          username: { type: 'string' },
          email: { type: 'string' },
        },
      },
      prop: {
        type: 'object',
        properties: {
          property: { type: 'string' },
          description: { type: 'string' },
          type: { enum: ['boolean', 'string', 'number'] },
        },
      },
    },
  }
  let jsonSchema: Schema

  beforeEach(() => {
    jsonSchema = new Schema(schema)
  })
  afterEach(() => {
    mongoose.models = {}
  })

  // it('validates', () => {
  //   const ajv = new Ajv()
  //   const validate = ajv.compile(schema)
  //   const valid = validate(componentData)

  //   expect(valid).toBeTruthy()
  // })

  it('transforms JsonSchema to Mongoose schemas for strings', () => {
    const userSchema = new mongoose.Schema({
      username: mongoose.Schema.Types.String,
      email: mongoose.Schema.Types.String,
    })
    const userModel: mongoose.Model<any> = mongoose.model('user2', userSchema)

    expect(jsonSchema.mongooseModels.user.schema.paths).toEqual(
      userModel.schema.paths,
    )
  })

  // it('transforms JsonSchema to Mongoose schemas for enums', () => {
  //   const propSchema = new mongoose.Schema({
  //     property: { type: mongoose.Schema.Types.String },
  //     description: { type: mongoose.Schema.Types.String },
  //     type: {
  //       type: mongoose.Schema.Types.String,
  //       enum: ['boolean', 'string', 'number'],
  //     },
  //   })
  //   const propModel: mongoose.Model<any> = mongoose.model('prop2', propSchema)

  //   const expectedSchema = jsonSchema.mongooseModels.prop.schema.paths
  //   const actualSchema = propModel.schema.paths

  //   console.log(expectedSchema)
  //   console.log(actualSchema)

  //   expect(expectedSchema).toMatchObject(actualSchema)
  // })

  it('transforms JsonSchema to Mongoose schemas for enums', () => {
    const propSchema = new mongoose.Schema({
      property: { type: mongoose.Schema.Types.String },
      description: { type: mongoose.Schema.Types.String },
      type: {
        type: mongoose.Schema.Types.String,
        enum: ['boolean', 'string', 'number'],
      },
    })
    const propModel: mongoose.Model<any> = mongoose.model('prop2', propSchema)
    const expectedSchema = jsonSchema.mongooseModels.prop.schema.paths
    const actualSchema = propModel.schema.paths

    expect(JSON.stringify(expectedSchema)).toEqual(JSON.stringify(actualSchema))
  })
})
