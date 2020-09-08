import React from 'react'
import { formDefaultData } from './data/Form-1--default.data'
import { TreeDom } from '../../renderer/TreeDom'
import { formObjectData } from './data/Form-2--object.data'
import { formConditionData } from './data/Form-3--condition.data'

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
