import {
  DashboardTemplate,
  DashboardTemplateProps,
} from '@codelab/frontend/view/templates'
import React, { PropsWithChildren } from 'react'
import { useBuilderSelectedElement } from '../hooks'

export type BuilderDashboardTemplateProps = DashboardTemplateProps

export const BuilderDashboardTemplate = ({
  children,
  MetaPane,
  ...props
}: PropsWithChildren<BuilderDashboardTemplateProps>) => {
  const { selectedElementId } = useBuilderSelectedElement()

  return (
    <DashboardTemplate
      headerHeight={props.headerHeight ?? 38}
      {...props}
      MetaPane={selectedElementId ? MetaPane : undefined}
    >
      {children}
    </DashboardTemplate>
  )
}

BuilderDashboardTemplate.displayName = 'BuilderDashboardTemplate'
