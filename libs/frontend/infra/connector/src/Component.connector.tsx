'use client'

import type { IComponentModel } from '@codelab/frontend-abstract-domain'
import type { IRef } from '@codelab/shared-abstract-core'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Spinner } from 'libs/frontend/presentation/view/src/components/loader'
import { observer } from 'mobx-react-lite'

export const ComponentConnector = observer<{
  id: string
  children(component: IComponentModel): ReactNode
}>(({ children, id }) => {
  const { componentDomainService } = useDomainStore()
  const component = componentDomainService.components.get(id)

  if (!component) {
    return <Spinner />
  }

  return <>{children(component)}</>
})
