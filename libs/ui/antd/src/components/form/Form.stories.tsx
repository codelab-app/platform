import React from 'react'
import {
  formConditionData,
  formDefaultData,
  formObjectData,
  hooksData,
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

export const FormHooks = () => {
  const Form = Renderer.components(hooksData)

  return <Form />
}
