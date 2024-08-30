import { FontBoldIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Toggle } from './Toggle'

export default {
  component: Toggle,
  title: 'Atoms/Toggle',
}

export const Default = {
  args: {},
  render: () => (
    <Toggle aria-label="Toggle italic">
      <FontBoldIcon className="size-4" />
    </Toggle>
  ),
}
