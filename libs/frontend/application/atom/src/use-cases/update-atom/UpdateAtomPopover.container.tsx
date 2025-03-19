'use client'

import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'

import { useRef } from 'react'

import { AtomConnector } from '../../views'
import { UpdateAtomPopover } from './UpdateAtomPopover'

export const UpdateAtomPopoverContainer = ({ id }: { id: string }) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)

  return (
    <AtomConnector id={id}>
      {(atom) => <UpdateAtomPopover atom={atom} submitRef={submitRef} />}
    </AtomConnector>
  )
}

UpdateAtomPopoverContainer.displayName = 'UpdateAtomPopoverContainer'
