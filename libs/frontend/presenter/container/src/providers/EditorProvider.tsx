import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import React, { PropsWithChildren } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import { withProvider } from './withProvider'

export const EditorProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>
}

export const withEditorProvider = withProvider(EditorProvider)
