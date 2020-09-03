import React from 'react'
import { formDefaultData } from './data/Form-1--default.data'
import { TreeDom } from '../../renderer/TreeDom'
import { formObjectData } from './data/Form-2--object.data'

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
