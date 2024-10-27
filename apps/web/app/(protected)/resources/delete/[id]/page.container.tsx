'use client'

import { useResourceService } from '@codelab/frontend-application-resource/services'
import { DeleteResourceModal } from '@codelab/frontend-application-resource/use-cases/delete-resource'
import { observer } from 'mobx-react-lite'

export const DeleteResourceModalContainer = observer(
  ({ id }: { id: string }) => {
    const resource = useResourceService().getOneFromCache({ id })

    if (!resource) {
      return null
    }

    return <DeleteResourceModal resource={resource} />
  },
)
