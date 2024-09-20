import { useState } from 'react'
import { Calendar } from './Calendar'

export default {
  component: Calendar,
  title: 'Atoms/Calendar',
}

const CalendarDemo = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      className="rounded-md border shadow"
      mode="single"
      onSelect={setDate}
      selected={date}
    />
  )
}

export const Default = {
  args: {},
  render: () => <CalendarDemo />,
}
