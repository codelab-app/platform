'use client'

import { TagConnector } from '../../views'
import { UpdateTagPopover } from './UpdateTagPopover'

export const UpdateTagPopoverContainer = ({ id }: { id: string }) => {
  return (
    <TagConnector id={id}>
      {(tag) => <UpdateTagPopover tag={tag} />}
    </TagConnector>
  )
}
