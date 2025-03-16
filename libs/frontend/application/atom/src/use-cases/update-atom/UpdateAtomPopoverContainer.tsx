'use client'

import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'

import { observer } from 'mobx-react-lite'
import { useRef } from 'react'

import { AtomConnector } from '../../views/Atom.connector'
import { UpdateAtomPopover } from './UpdateAtomPopover'

export const UpdateAtomPopoverContainer = observer<{ id: string }>(({ id }) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)

  return (
    <AtomConnector id={id}>
      {(atom) => <UpdateAtomPopover atom={atom} submitRef={submitRef} />}
    </AtomConnector>
  )
})

UpdateAtomPopoverContainer.displayName = 'UpdateAtomPopoverContainer'
