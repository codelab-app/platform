import { EditorProvider } from '@codelab/frontend/builder'
import { ComponentProvider } from '@codelab/frontend/shared'
import { useRouter } from 'next/router'
import React, { PropsWithChildren } from 'react'
import { DashboardLayout } from '../layout/DashboardLayout'
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
    <ComponentProvider componentId={componentId}>
      <EditorProvider>
        <DashboardLayout MainPane={MainPane} SidebarNavigation={() => <></>}>
          {children}
        </DashboardLayout>
      </EditorProvider>
    </ComponentProvider>
  )
}
