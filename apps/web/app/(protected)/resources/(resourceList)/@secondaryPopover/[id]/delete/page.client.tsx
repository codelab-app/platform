'use client'

import { DeleteResourceModal } from '@codelab/frontend-application-resource/use-cases/delete-resource'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DeleteResourceModalClient = observer(({ id }: { id: string }) => {
  const { resourceDomainService } = useDomainStore()
  const resource = resourceDomainService.resources.get(id)

  if (!resource) {
    return null
  }

  return <DeleteResourceModal resource={resource} />
})
