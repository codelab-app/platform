import React, { PropsWithChildren } from 'react'
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { PropsWithIds } from '@codelab/frontend/shared'

export const Editor = ({
  children,
  pageId,
}: PropsWithChildren<PropsWithIds<'pageId'>>) => {
  return <DndProvider options={HTML5toTouch}>{children}</DndProvider>
}
