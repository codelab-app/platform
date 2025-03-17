'use client'

import type { IActionModel } from '@codelab/frontend/abstract/domain'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { Spinner } from '@codelab/frontend-presentation-view/components/spinner'
import { observer } from 'mobx-react-lite'

export const ActionConnector = observer<{
  id: string
  children(action: IActionModel): React.ReactNode
}>(({ children, id }) => {
  const { actionDomainService } = useDomainStore()
  const action = actionDomainService.actions.get(id)

  if (!action) {
    return <Spinner />
  }

  return children(action)
})
