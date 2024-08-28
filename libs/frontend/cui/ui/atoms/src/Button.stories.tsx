import React from 'react'
import { Button } from './Button'

export default {
  component: Button,
  title: 'Atoms/Button',
}

export const Default = {
  args: {},
  render: () => <Button variant="default">click me</Button>,
}

export const Secondary = {
  args: {},
  render: () => <Button variant="secondary">click me</Button>,
}

export const Outline = {
  args: {},
  render: () => <Button variant="outline">click me</Button>,
}
