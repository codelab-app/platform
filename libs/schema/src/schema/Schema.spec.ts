/**
 * @jest-environment node
 */
import Ajv from 'ajv'
import { JSONSchema7Definition } from 'json-schema'
// import schemaData from 'src/json/JsonSchema-schema.json'
import { Schema } from 'mongoose'
import { JsonSchema } from './Schema'
import data from './Schema-data.json'
import { modelJsonSchema } from './Schema-data'

describe('JsonSchema', () => {
  beforeEach(() => {
    jest.restoreAllMocks()
  })

  it('validates JsonSchema', () => {
    const ajv = new Ajv()
    const validate = ajv.compile(modelJsonSchema)
    const valid = validate(data)

    expect(valid).toBeTruthy()
  })

  it('calls mongooseSchema in parseRefs', () => {
    // jest.mock('src/json/JsonSchema')

    const mockMongooseSchema = jest
      .spyOn(JsonSchema, 'mongooseSchema')
      .mockImplementation((definition: JSONSchema7Definition) => new Schema())

    const jsonSchema = new JsonSchema(modelJsonSchema)

    expect(mockMongooseSchema).toBeCalledWith({
      model: modelJsonSchema?.definitions?.['model'],
    })

    expect(JsonSchema.mongooseSchema).toHaveBeenCalled()
  })

  it('parses unique', () => {
    let propertyDefinition: JSONSchema7Definition = {
      type: 'string',
      uniqueItems: true,
    }

    let unique: boolean = JsonSchema.parseUnique(propertyDefinition)

    expect(unique).toBeTruthy()

    propertyDefinition = {
      type: 'string',
      uniqueItems: false,
    }

    unique = JsonSchema.parseUnique(propertyDefinition)

    expect(unique).toBeFalsy()
  })

  it('parses required', () => {
    const schemaDefinition: JSONSchema7Definition = modelJsonSchema.definitions!
      .model

    let required: boolean = JsonSchema.parseRequired('name', schemaDefinition)

    expect(required).toBeTruthy()

    required = JsonSchema.parseRequired('not-name', schemaDefinition)

    expect(required).toBeFalsy()
  })

  // it('transforms JsonSchema to MongooseModel', () => {
  //   const modelSchema = new Schema({
  //     name: {
  //       type: Schema.Types.String,
  //       required: true,
  //       unique: true,
  //     },
  //     fields: [
  //       {
  //         type: Schema.Types.ObjectId,
  //         ref: 'Field',
  //       },
  //     ],
  //   })
  //   // const fieldSchema = new Schema({
  //   //   name: {
  //   //     type: String,
  //   //     required: true,
  //   //     unique: true,
  //   //   },
  //   // })
  //
  //   console.log(modelSchema)
  //
  //   const Model = mongoose.model('Model', modelSchema)
  //   // const Field = mongoose.model('Field', fieldSchema)
  //
  //   // Parse
  //   const ParsedModel: any = new JsonSchema(modelJsonSchema)
  //
  //   expect(ParsedModel.Model).toEqual(Model)
  //   // expect(ParsedModel.Field).toEqual(Field)
  // })
})
