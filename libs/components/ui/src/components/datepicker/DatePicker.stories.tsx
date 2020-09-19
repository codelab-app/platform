import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { datePickerData } from './DatePicker.data'

export default {
  title: 'DatePicker',
}

export const Default = () => {
  const DatePicker = TreeDom.render(datePickerData)

  return <DatePicker />
}
