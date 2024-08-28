import { CaretSortIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { Button } from '../Button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible'

export default {
  component: Collapsible,
  title: 'Atoms/Collapsible',
}

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Collapsible
      className="w-[350px] space-y-2"
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button size="sm" variant="ghost">
            <CaretSortIcon className="size-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="space-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm shadow-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export const Default = {
  args: {},
  render: () => <CollapsibleDemo />,
}
