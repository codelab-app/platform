'use client'

import { TagsConnector } from '@codelab/frontend/infra/connector'

import { DeleteTagsModal } from './DeleteTagsModal'

export const DeleteTagsModalContainer = ({ ids }: { ids: Array<string> }) => {
  return (
    <TagsConnector ids={ids}>
      {(tags) => (tags.length ? <DeleteTagsModal tags={tags} /> : null)}
    </TagsConnector>
  )
}
