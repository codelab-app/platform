import { isEqual } from 'lodash'
import { Schema } from 'mongoose'
import React from 'react'
import { JsonSchema } from './schema'
import { modelJsonSchema } from './schema-data'

export default {
  title: 'Schema',
}

export const Default = () => {
  const parsedSchemas: any = new JsonSchema(modelJsonSchema)

  const modelSchema = new Schema({
    name: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    fields: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Field',
      },
    ],
  })
  // const fieldSchema = new Schema({
  //   name: {
  //     type: String,
  //     required: true,
  //     unique: true,
  //   },
  // })

  const expectedSchema = JSON.stringify(modelSchema)
  const actualSchema = JSON.stringify(parsedSchemas.schemas.model)

  console.log(expectedSchema)
  console.log(actualSchema)

  console.log(isEqual(expectedSchema, actualSchema))

  return <div>@codelab/common</div>
}
