import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import React, { PropsWithChildren } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'

export const EditorProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>
}
