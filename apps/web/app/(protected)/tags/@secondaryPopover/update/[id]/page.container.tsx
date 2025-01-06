'use client'

import { useTagService } from '@codelab/frontend-application-tag/services'
import { UpdateTagPopover } from '@codelab/frontend-application-tag/use-cases/update-tag'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

const UpdateTagContainer = observer(({ id }: { id: string }) => {
  const { tagDomainService } = useDomainStore()
  const tag = tagDomainService.tags.get(id)

  if (!tag) {
    return null
  }

  return <UpdateTagPopover tag={tag} />
})

export default UpdateTagContainer
