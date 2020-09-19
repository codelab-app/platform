import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { timePickerData } from './TimePicker.data'

export default {
  title: 'TimePicker',
}

export const Default = () => {
  const TimePicker = TreeDom.render(timePickerData)

  return <TimePicker />
}
