import React from 'react'
import { calendarData } from './Calendar.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Calendar',
  parameters: {
    data: {
      Default: calendarData,
    },
  },
}

export const Default = () => {
  const Calendar = Renderer.components(calendarData)

  return <Calendar />
}
