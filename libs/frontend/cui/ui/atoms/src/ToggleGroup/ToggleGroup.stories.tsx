import {
  FontBoldIcon,
  FontItalicIcon,
  UnderlineIcon,
} from '@radix-ui/react-icons'
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from './ToggleGroup'

export default {
  component: ToggleGroup,
  title: 'Atoms/ToggleGroup',
}

export const Default = {
  args: {},
  render: () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem aria-label="Toggle bold" value="bold">
        <FontBoldIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle italic" value="italic">
        <FontItalicIcon className="size-4" />
      </ToggleGroupItem>
      <ToggleGroupItem aria-label="Toggle strikethrough" value="strikethrough">
        <UnderlineIcon className="size-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  ),
}
