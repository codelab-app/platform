'use client'

import type { ITagModel } from '@codelab/frontend/abstract/domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const TagConnector = observer<{
  id: string
  children(tag: ITagModel): ReactNode
}>(({ children, id }) => {
  const { tagDomainService } = useDomainStore()
  const tag = tagDomainService.tags.get(id)

  if (!tag) {
    return null
  }

  return <>{children(tag)}</>
})
