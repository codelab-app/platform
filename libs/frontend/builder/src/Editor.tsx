import React from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

export const Editor: React.FC<{ pageId: string }> = ({ children, pageId }) => {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>
}
