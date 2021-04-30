import { EditorProvider } from '@codelab/frontend/builder'
import { ComponentProvider } from '@codelab/frontend/shared'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { LayoutBuilder } from './Layout--builder'

export const LayoutComponentDetail = (
  props: PropsWithChildren<Record<string, unknown>>,
) => {
  const { children } = props
  const { query } = useRouter()

  const componentId = `${query.componentId}`

  if (!componentId) {
    throw new Error('Missing "componentId"')
  }

  return (
    <ComponentProvider componentId={componentId}>
      <EditorProvider>
        <LayoutBuilder>{children}</LayoutBuilder>
      </EditorProvider>
    </ComponentProvider>
  )
}
