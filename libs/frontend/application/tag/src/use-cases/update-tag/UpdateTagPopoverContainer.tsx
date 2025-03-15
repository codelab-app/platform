'use client'

import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { TagConnector } from '../../views'
import { UpdateTagPopover } from './UpdateTagPopover'

export const UpdateTagPopoverContainer = observer<{ id: string }>(({ id }) => {
  return (
    <TagConnector id={id}>
      {(tag) => <UpdateTagPopover tag={tag} />}
    </TagConnector>
  )
})
