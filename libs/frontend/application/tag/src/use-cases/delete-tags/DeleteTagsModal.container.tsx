'use client'

import { TagsConnector } from '@codelab/frontend/infra/connector'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { DeleteTagsModal } from './DeleteTagsModal'

export const DeleteTagsModalContainer = ({ ids }: { ids: Array<string> }) => {
  return (
    <TagsConnector ids={ids}>
      {(tags) => (tags.length ? <DeleteTagsModal tags={tags} /> : null)}
    </TagsConnector>
  )
}
