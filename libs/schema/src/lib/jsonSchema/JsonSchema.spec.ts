/**
 * @jest-environment node
 */
import mongoose from 'mongoose'
import { JSONSchema7 } from 'json-schema'

import { JsonSchema } from './JsonSchema'

describe('Json Schema', () => {
  const schema: JSONSchema7 = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    additionalProperties: false,
    type: 'object',
    definitions: {
      user: {
        $id: 'user',
        type: 'object',
        properties: {
          username: { type: 'string' },
          email: { type: 'string' },
        },
      },
      component: {
        $id: 'component',
        type: 'object',
        properties: {
          name: { type: 'string' },
          props: {
            type: 'array',
            items: {
              $ref: '#/definitions/prop',
            },
          },
        },
      },
      prop: {
        $id: 'prop',
        type: 'object',
        properties: {
          property: { type: 'string' },
          description: { type: 'string' },
          type: { enum: ['boolean', 'string', 'number'] },
        },
      },
    },
  }
  let jsonSchema: JsonSchema

  /**
   * Schema
   */
  const userSchema = new mongoose.Schema({
    username: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
  })
  const componentSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    props: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'prop',
      },
    ],
  })
  const propSchema = new mongoose.Schema({
    property: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String },
    type: {
      type: mongoose.Schema.Types.String,
      enum: ['boolean', 'string', 'number'],
    },
  })

  /**
   * Model
   */
  const userModel = mongoose.model('user2', userSchema)
  const componentModel = mongoose.model('component2', componentSchema)
  const propModel = mongoose.model('prop2', propSchema)

  beforeEach(() => {
    jsonSchema = new JsonSchema(schema)
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
    expect(jsonSchema.mongooseModels.user.schema.paths).toEqual(
      userModel.schema.paths,
    )
  })

  it('transforms JsonSchema to Mongoose schemas for enums', () => {
    const expectedSchema = jsonSchema.mongooseModels.prop.schema.paths
    const actualSchema = propModel.schema.paths

    expect(JSON.stringify(expectedSchema)).toEqual(JSON.stringify(actualSchema))
  })

  it('parses $ref', () => {
    const expectedSchema = jsonSchema.mongooseModels.component.schema.paths
    const actualSchema = componentModel.schema.paths

    expect(JSON.stringify(expectedSchema)).toEqual(JSON.stringify(actualSchema))
  })
})
