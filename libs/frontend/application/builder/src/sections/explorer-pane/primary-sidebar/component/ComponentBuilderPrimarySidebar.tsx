'use client'

import type { IComponentBuilderRoute } from '@codelab/frontend/abstract/application'
import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { TreeViewSearchParams } from '@codelab/frontend/abstract/types'

import { IRouteType } from '@codelab/frontend/abstract/application'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'

export const ComponentBuilderPrimarySidebar = ({
  component,
  context,
}: {
  component: IComponentModel
  context: IComponentBuilderRoute
}) => <BaseBuilderPrimarySidebar containerNode={component} context={context} />

ComponentBuilderPrimarySidebar.displayName = 'ComponentPrimarySidebar'
