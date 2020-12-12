/**
 * @jest-environment node
 */
import { JSONSchema7 } from 'json-schema'
import * as mongoose from 'mongoose'
import { JsonModel, JsonModels } from './model'

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

  let models: JsonModels

  beforeAll(() => {
    delete mongoose.models
    models = JsonModel.parse(schema)
  })

  // it('validates', () => {
  //   const ajv = new Ajv()
  //   const validate = ajv.compile(schema)
  //   const valid = validate(componentData)

  //   expect(valid).toBeTruthy()
  // })

  it('can retrieve a list of model names', () => {
    expect(Array.from(models.keys())).toEqual(['user', 'component', 'prop'])
  })

  it('retrieves the model name', () => {
    expect(models.get('user').name).toEqual('user')
  })

  it('transforms JsonSchema to Mongoose schemas for strings', () => {
    const expectedSchema = models.get('user').schema.paths
    const actualSchema = userModel.schema.paths

    expect(JSON.stringify(expectedSchema)).toEqual(JSON.stringify(actualSchema))
  })

  it('transforms JsonSchema to Mongoose schemas for enums', () => {
    const expectedSchema = propModel.schema.paths
    const actualSchema = models.get('prop').schema.paths

    expect(JSON.stringify(expectedSchema)).toEqual(JSON.stringify(actualSchema))
  })

  it('parses $ref', () => {
    const expectedSchema = componentModel.schema.paths
    const actualSchema = models.get('component').schema.paths

    expect(JSON.stringify(expectedSchema)).toEqual(JSON.stringify(actualSchema))
  })

  // it('retrieves the schema for a model', () => {
  //   const actualUserSchema = models.get('user').schema
  //   const actualPropSchema = models.get('prop').schema
  //   const actualComponentSchema = models.get('component').schema

  //   expect(JSON.stringify(userModel.schema.paths)).toEqual(
  //     JSON.stringify(actualUserSchema.paths),
  //   )
  //   expect(JSON.stringify(propModel.schema.paths)).toEqual(
  //     JSON.stringify(actualPropSchema.paths),
  //   )
  //   expect(JSON.stringify(componentModel.schema.paths)).toEqual(
  //     JSON.stringify(actualComponentSchema.paths),
  //   )
  // })
})
