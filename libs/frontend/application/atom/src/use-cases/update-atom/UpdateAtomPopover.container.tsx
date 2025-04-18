'use client'

import type { IAtomUpdateRoute } from '@codelab/frontend-abstract-application'
import type { SubmitController } from '@codelab/frontend-abstract-types'
import type { Maybe } from '@codelab/shared-abstract-types'

import { AtomConnector } from '@codelab/frontend-infra-connector'
import { useRef } from 'react'

import { UpdateAtomPopover } from './UpdateAtomPopover'

export const UpdateAtomPopoverContainer = ({
  context,
}: {
  context: IAtomUpdateRoute
}) => {
  const {
    params: { atomId },
  } = context

  const submitRef = useRef<Maybe<SubmitController>>(undefined)

  return (
    <AtomConnector id={atomId}>
      {(atom) => (
        <UpdateAtomPopover
          atom={atom}
          context={context}
          submitRef={submitRef}
        />
      )}
    </AtomConnector>
  )
}

UpdateAtomPopoverContainer.displayName = 'UpdateAtomPopoverContainer'
