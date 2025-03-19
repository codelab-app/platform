'use client'

import { TagsConnector } from '../../views'
import { DeleteTagsModal } from './DeleteTagsModal'

export const DeleteTagsModalContainer = ({ ids }: { ids: Array<string> }) => {
  return (
    <TagsConnector ids={ids}>
      {(tags) => (tags.length ? <DeleteTagsModal tags={tags} /> : null)}
    </TagsConnector>
  )
}
