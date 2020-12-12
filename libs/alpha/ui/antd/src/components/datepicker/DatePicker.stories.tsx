import React from 'react'
import { datePickerData } from './DatePicker.data'
import { Renderer } from '@codelab/alpha/core/renderer'

export default {
  title: 'DatePicker',
  parameters: {
    data: {
      Default: datePickerData,
    },
  },
}

export const Default = () => {
  const DatePicker = Renderer.components(datePickerData)

  return <DatePicker />
}
