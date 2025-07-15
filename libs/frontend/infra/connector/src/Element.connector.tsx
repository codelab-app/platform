'use client'

import type { IElementModel } from '@codelab/frontend-abstract-domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { Spinner } from '@codelab/frontend-presentation-view/components/loader'
import { observer } from 'mobx-react-lite'

export const ElementConnector = observer<{
  id: string
  children(element: IElementModel): ReactNode
}>(({ children, id }) => {
  const { elementDomainService } = useDomainStore()
  const element = elementDomainService.elements.get(id)

  if (!element) {
    return <Spinner />
  }

  return children(element)
})
