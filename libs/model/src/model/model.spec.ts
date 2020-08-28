import * as mongoose from 'mongoose'
import { Model } from './model'
import { ModelNode } from './model-interface'

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

  const personExample: ModelNode = {
    nodeType: 'Model',
    props: {
      name: 'PersonExample',
    },
    children: [
      {
        nodeType: 'Schema',
        props: {
          name: { type: 'string' },
          age: { type: 'number' },
          role: { type: 'string', enum: ['teacher', 'student'] },
        },
      },
    ],
  }

  const storyExample: ModelNode = {
    nodeType: 'Model',
    props: { name: 'StoryExample' },
    children: [
      {
        nodeType: 'Schema',
        props: {
          author: { type: 'string', ref: 'PersonExample' },
          title: { type: 'string' },
        },
      },
    ],
  }

  const Person = mongoose.model('Person', personSchema)
  const Story = mongoose.model('Story', storySchema)

  const PersonExample = Model.makeModel(personExample)
  const StoryExample = Model.makeModel(storyExample)

  it('should transform JSON Schema to Mongoose Schema for string, number and enum', () => {
    const expectedSchema = Person.schema.paths
    const actualSchema = PersonExample.schema.paths

    expect(JSON.stringify(actualSchema)).toEqual(JSON.stringify(expectedSchema))
  })

  it('should parse ref', () => {
    const expectedSchema = Story.schema.paths
    const actualSchema = StoryExample.schema.paths

    expect(JSON.stringify(actualSchema)).toEqual(JSON.stringify(expectedSchema))
  })
})
