'use client'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { TagsConnector } from '../../views/Tags.connector'
import { DeleteTagsModal } from './DeleteTagsModal'

export const DeleteTagsModalContainer = observer(
  ({ ids }: { ids: Array<string> }) => {
    return (
      <TagsConnector ids={ids}>
        {(tags) => (tags.length ? <DeleteTagsModal tags={tags} /> : null)}
      </TagsConnector>
    )
  },
)
