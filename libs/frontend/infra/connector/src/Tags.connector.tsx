'use client'

import type { ITagModel } from '@codelab/frontend-abstract-domain'
import type { ReactNode } from 'react'

import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { observer } from 'mobx-react-lite'

export const TagsConnector = observer<{
  ids: Array<string>
  children(tags: Array<ITagModel>): ReactNode
}>(({ children, ids }) => {
  const { tagDomainService } = useDomainStore()
  const tags = tagDomainService.tagsList.filter((tag) => ids.includes(tag.id))

  return <>{children(tags)}</>
})
