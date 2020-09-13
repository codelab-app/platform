import React from 'react'
import {
  formDefaultData,
  formObjectData,
  formConditionData,
  nodeFormData,
} from './data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Form',
}

export const Default = () => {
  const Form = TreeDom.render(formDefaultData)

  return <Form />
}

/**
 * Contains nested object, or arrays
 */
export const ObjectForm = () => {
  const Form = TreeDom.render(formObjectData)

  return <Form />
}

/**
 * Conditional form field
 */
export const ConditionalForm = () => {
  const Form = TreeDom.render(formConditionData)

  return <Form />
}

export const NodeForm = () => {
  const Form = TreeDom.render(nodeFormData)

  return <Form />
}
