import React from 'react'
import { TreeDom } from '@codelab/core/renderer'
import { calendarData } from './Calendar.data'

export default {
  title: 'Calendar',
}

export const Default = () => {
  const Calendar = TreeDom.render(calendarData)

  return <Calendar />
}
