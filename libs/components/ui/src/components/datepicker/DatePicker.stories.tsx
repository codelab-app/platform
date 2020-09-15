import React from 'react'
import { datePickerData } from './DatePicker.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'DatePicker',
}

export const Default = () => {
  const DatePicker = TreeDom.render(datePickerData)

  return <DatePicker />
}
