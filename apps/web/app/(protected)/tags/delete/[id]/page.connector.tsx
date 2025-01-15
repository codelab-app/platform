'use client'

import { DeleteTagsModal } from '@codelab/frontend-application-tag/use-cases/delete-tags'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

export const DeleteTagsModalConnector = observer(
  ({ ids }: { ids: Array<string> }) => {
    const { tagDomainService } = useDomainStore()

    const tagsToDelete = tagDomainService.tagsList.filter((tag) =>
      ids.includes(tag.id),
    )

    return tagsToDelete.length ? <DeleteTagsModal tags={tagsToDelete} /> : null
  },
)
