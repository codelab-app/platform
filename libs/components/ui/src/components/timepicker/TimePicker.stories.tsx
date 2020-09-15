import React from 'react'
import { timePickerData } from './TimePicker.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'TimePicker',
}

export const Default = () => {
  const TimePicker = TreeDom.render(timePickerData)

  return <TimePicker />
}
