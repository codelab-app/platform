'use client'

import type { IElementModel } from '@codelab/frontend/abstract/domain'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const ElementConnector = observer<{
  id: string
  children(element: IElementModel): React.ReactNode
}>(({ children, id }) => {
  const { elementDomainService } = useDomainStore()
  const element = elementDomainService.elements.get(id)

  if (!element) {
    return <Spinner />
  }

  return children(element)
})
