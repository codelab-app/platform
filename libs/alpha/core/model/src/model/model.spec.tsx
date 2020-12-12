/**
 * @jest-environment node
 */
import * as mongoose from 'mongoose'
import { makeModel } from '@codelab/alpha/core/tree'
import { NodeI, NodeType } from '@codelab/alpha/shared/interface/node'

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

  const personExample: NodeI = {
    type: NodeType.Model,
    props: {
      name: 'PersonExample',
    },
    children: [
      {
        type: NodeType.Schema,
        props: {
          name: { type: 'string' },
          age: { type: 'number' },
          role: { type: 'string', enum: ['teacher', 'student'] },
        },
      },
    ],
  }

  const storyExample: NodeI = {
    type: NodeType.Model,
    props: { name: 'StoryExample' },
    children: [
      {
        type: NodeType.Schema,
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
