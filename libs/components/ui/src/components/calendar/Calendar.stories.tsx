import React from 'react'
import { calendarData } from './Calendar.data'
import { TreeDom } from '../../renderer/TreeDom'

export default {
  title: 'Calendar',
}

export const Default = () => {
  const Calendar = TreeDom.render(calendarData)

  return <Calendar />
}
