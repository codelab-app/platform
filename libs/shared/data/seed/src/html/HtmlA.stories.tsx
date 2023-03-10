/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from '@codelab/frontend/view/components'
import type { JSONSchemaType } from 'ajv'
import React from 'react'
import HtmlA from './HtmlA.json'

export default {
  /* 👇 The title prop is optional.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: 'HtmlA',
  component: () => null,
}

console.log(HtmlA)

const schema: JSONSchemaType<any> = {
  type: 'object',
  properties: {
    anchor: { $ref: HtmlA.$ref },
    // anchor: { $ref: '#/definitions/anchor' },
  },
  definitions: { ...HtmlA.definitions },
  // definitions: {
  //   anchor: {
  //     type: 'object',
  //     properties: {
  //       id: {
  //         nullable: true,
  //         type: 'string',
  //       },
  //     },
  //     required: [],
  //   },
  // },
}

export const Primary = () => {
  return <Form model={{}} onSubmit={() => Promise.resolve()} schema={schema} />
}
