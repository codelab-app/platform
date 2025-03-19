'use client'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'

import { IRouteType } from '@codelab/frontend/abstract/application'
import { observer } from 'mobx-react-lite'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'

export const ComponentBuilderPrimarySidebar = observer<{
  component: IComponentModel
}>(({ component }) => (
  <BaseBuilderPrimarySidebar
    containerNode={component}
    context={{
      params: {
        componentId: component.id,
      },
      type: IRouteType.Component,
    }}
  />
))

ComponentBuilderPrimarySidebar.displayName = 'ComponentPrimarySidebar'
