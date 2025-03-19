'use client'

import { TagConnector } from '@codelab/frontend/infra/connector'

import { UpdateTagPopover } from './UpdateTagPopover'

export const UpdateTagPopoverContainer = ({ id }: { id: string }) => {
  return (
    <TagConnector id={id}>
      {(tag) => <UpdateTagPopover tag={tag} />}
    </TagConnector>
  )
}
