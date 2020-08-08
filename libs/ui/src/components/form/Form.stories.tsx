import React from 'react'
import { formData } from './Form.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Form',
}

export const Default = () => {
  const Form = TreeDom.render(formData)

  return <Form />
}
