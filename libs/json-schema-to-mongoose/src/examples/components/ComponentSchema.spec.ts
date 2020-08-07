import mongoose from 'mongoose'

import { JSONSchema7 } from 'json-schema'
import { Schema } from './Schema'

const baseSchema: JSONSchema7 = {
  $schema: 'http://json-schema.org/draft-07/schema#',
  additionalProperties: false,
  type: 'object',
}

describe('ComponentSchema', () => {
  // it('validates', () => {
  //   const ajv = new Ajv()
  //   const validate = ajv.compile(componentSchema)
  //   const valid = validate(componentData)

  //   expect(valid).toBeTruthy()
  // })

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
  const { mongooseModels } = new Schema(schema)

  it('transforms JsonSchema to Mongoose schemas for strings', () => {
    const userSchema = new mongoose.Schema({
      username: mongoose.Schema.Types.String,
      email: mongoose.Schema.Types.String,
    })
    const userModel: mongoose.Model<any> = mongoose.model('user2', userSchema)

    expect(mongooseModels.user.schema.paths).toEqual(userModel.schema.paths)
  })

  it('transforms JsonSchema to Mongoose schemas for enums', () => {
    const propSchema = new mongoose.Schema({
      property: { type: mongoose.Schema.Types.String },
      description: { type: mongoose.Schema.Types.String },
      type: {
        type: mongoose.Schema.Types.String,
        // enum: ['boolean', 'string', 'number'],
      },
    })
    const propModel: mongoose.Model<any> = mongoose.model('prop2', propSchema)

    expect(mongooseModels.prop.schema.paths).toEqual(propModel.schema.paths)
  })
})
