'use client'

import { UpdateResourcePopover } from '@codelab/frontend-application-resource/use-cases/update-resource'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

const UpdateResourceClient = observer(({ id }: { id: string }) => {
  const { resourceDomainService } = useDomainStore()
  const resource = resourceDomainService.resources.get(id)

  if (!resource) {
    return null
  }

  return <UpdateResourcePopover resource={resource} />
})

export default UpdateResourceClient
