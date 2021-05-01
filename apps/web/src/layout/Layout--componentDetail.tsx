import { EditorProvider } from '@codelab/frontend/builder'
import { ComponentProvider, LibraryProvider } from '@codelab/frontend/shared'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { LayoutBuilder } from './Layout--builder'
import { WithMainPane } from './Layout.d'

export const LayoutComponentDetail = (
  props: PropsWithChildren<WithMainPane>,
) => {
  const { children, MainPane } = props
  const { query } = useRouter()

  const componentId = `${query.componentId}`

  if (!componentId) {
    throw new Error('Missing "componentId"')
  }

  return (
    <LibraryProvider>
      <ComponentProvider componentId={componentId}>
        <EditorProvider>
          <LayoutBuilder MainPane={MainPane}>{children}</LayoutBuilder>
        </EditorProvider>
      </ComponentProvider>
    </LibraryProvider>
  )
}
