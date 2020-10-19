import React from 'react'
import {
  formConditionData,
  formCustomData,
  formDefaultData,
  formObjectData,
  nodeFormData,
} from './data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Form',
}

export const Default = () => {
  const Form = Renderer.components(formDefaultData)

  return <Form />
}

/**
 * Contains nested object, or arrays
 */
export const ObjectForm = () => {
  const Form = Renderer.components(formObjectData)

  return <Form />
}

/**
 * Conditional form field
 */
export const ConditionalForm = () => {
  const Form = Renderer.components(formConditionData)

  return <Form />
}

export const NodeForm = () => {
  const Form = Renderer.components(nodeFormData)

  return <Form />
}

export const CustomForm = () => {
  const Form = Renderer.components(formCustomData)

  return <Form />
}
