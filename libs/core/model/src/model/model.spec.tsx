/**
 * @jest-environment node
 */
import * as mongoose from 'mongoose'
import { makeModel } from '@codelab/core/tree'
import { NodeDtoI } from '@codelab/shared/interface/node'

describe('Model', () => {
  const personSchema = new mongoose.Schema({
    name: { type: mongoose.Schema.Types.String },
    age: { type: mongoose.Schema.Types.Number },
    role: {
      type: mongoose.Schema.Types.String,
      enum: ['teacher', 'student'],
    },
  })

  const storySchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'PersonExample' },
    title: { type: mongoose.Schema.Types.String },
  })

  const personExample: NodeDtoI = {
    type: 'Model',
    props: {
      name: 'PersonExample',
    },
    children: [
      {
        type: 'Schema',
        props: {
          name: { type: 'string' },
          age: { type: 'number' },
          role: { type: 'string', enum: ['teacher', 'student'] },
        },
      },
    ],
  }

  const storyExample: NodeDtoI = {
    type: 'Model',
    props: { name: 'StoryExample' },
    children: [
      {
        type: 'Schema',
        props: {
          author: { type: 'string', ref: 'PersonExample' },
          title: { type: 'string' },
        },
      },
    ],
  }

  const Person = mongoose.model('Person', personSchema)
  const Story = mongoose.model('Story', storySchema)

  const PersonExample = makeModel(personExample)
  const StoryExample = makeModel(storyExample)

  it('should transform JSON Schema to Mongoose Schema for string, number and enum', () => {
    const expectedSchema = Person.schema.paths
    const actualSchema = PersonExample?.schema?.paths

    expect(JSON.stringify(actualSchema)).toEqual(JSON.stringify(expectedSchema))
  })

  it('should parse ref', () => {
    const expectedSchema = Story.schema.paths
    const actualSchema = StoryExample?.schema?.paths

    expect(JSON.stringify(actualSchema)).toEqual(JSON.stringify(expectedSchema))
  })
})
