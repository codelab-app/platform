import React from 'react'
import { timePickerData } from './TimePicker.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'TimePicker',
  parameters: {
    data: {
      Default: timePickerData,
    },
  },
}

export const Default = () => {
  const TimePicker = Renderer.components(timePickerData)

  return <TimePicker />
}
