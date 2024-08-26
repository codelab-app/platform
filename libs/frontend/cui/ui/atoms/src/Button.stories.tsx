import React from 'react'
import { Button } from './Button'

export default {
  component: Button,
  title: 'Atoms/Button',
}

export const Default = {
  args: {},
  render: () => <Button variant="outline">click me</Button>,
}
