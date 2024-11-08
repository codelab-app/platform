'use client'

import { useTagService } from '@codelab/frontend-application-tag/services'
import { UpdateTagPopover } from '@codelab/frontend-application-tag/use-cases/update-tag'
import { observer } from 'mobx-react-lite'

const UpdateTagContainer = observer(({ id }: { id: string }) => {
  const tag = useTagService().getOneFromCache({ id })

  if (!tag) {
    return null
  }

  return <UpdateTagPopover tag={tag} />
})

export default UpdateTagContainer
