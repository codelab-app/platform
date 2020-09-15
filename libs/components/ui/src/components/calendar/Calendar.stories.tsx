import React from 'react'
import { calendarData } from './Calendar.data'
import { TreeDom } from '@codelab/core/renderer'

export default {
  title: 'Calendar',
}

export const Default = () => {
  const Calendar = TreeDom.render(calendarData)

  return <Calendar />
}
