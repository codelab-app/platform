/**
 * @jest-environment node
 */
import * as mongoose from 'mongoose'
import { schemaFactory } from './schema-factory'
import { PropsSchema } from '@codelab/shared/interface/props'

describe('Schema', () => {
  it('should transform from JSON Schema to Schema', () => {
    const personSchema = new mongoose.Schema({
      name: { type: mongoose.Schema.Types.String },
      age: { type: mongoose.Schema.Types.Number },
      role: {
        type: mongoose.Schema.Types.String,
        enum: ['teacher', 'student'],
      },
    })

    const personExample: PropsSchema = {
      name: { type: 'string' },
      age: { type: 'number' },
      role: { type: 'string', enum: ['teacher', 'student'] },
    }

    const personExampleSchema = schemaFactory({
      type: 'Schema',
      props: personExample,
    })

    const expectedSchema = JSON.stringify(personSchema.paths)
    const actualSchema = JSON.stringify(personExampleSchema.paths)

    expect(actualSchema).toEqual(expectedSchema)
  })
})
