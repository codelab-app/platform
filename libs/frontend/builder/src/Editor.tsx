import React, { PropsWithChildren } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

export const Editor = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>
}
