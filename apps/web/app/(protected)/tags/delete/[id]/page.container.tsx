'use client'

import { useTagService } from '@codelab/frontend-application-tag/services'
import { DeleteTagsModal } from '@codelab/frontend-application-tag/use-cases/delete-tags'
import { observer } from 'mobx-react-lite'

export const DeleteTagsModalContainer = observer(
  ({ ids }: { ids: Array<string> }) => {
    const allTags = useTagService().getAllFromCache()
    const tagsToDelete = allTags.filter((tag) => ids.includes(tag.id))

    return tagsToDelete.length ? <DeleteTagsModal tags={tagsToDelete} /> : null
  },
)
