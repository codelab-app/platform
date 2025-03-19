'use client'

import type { IComponentModel } from '@codelab/frontend/abstract/domain'
import type { SearchParamsPageProps } from '@codelab/frontend/abstract/types'

import {
  type ComponentContextParams,
  IRouteType,
} from '@codelab/frontend/abstract/application'
import { ExplorerPaneType } from '@codelab/frontend/abstract/types'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

import { BaseBuilderPrimarySidebar } from '../base-builder/BaseBuilderPrimarySidebar'
import { ComponentListPrimarySidebar } from './ComponentListPrimarySidebar'

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
