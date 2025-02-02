'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { MutableRefObject } from 'react'

import { type SubmitController } from '@codelab/frontend/abstract/types'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'

import { useAtomService } from '../../services'
import { UpdateAtomForm } from './UpdateAtomForm'

export const UpdateAtomPopover = observer<{
  atom: IAtomModel
  submitRef: MutableRefObject<Maybe<SubmitController>>
}>(({ atom, submitRef }) => {
  const { updatePopover } = useAtomService()
  const router = useRouter()

  return (
    <UpdateAtomForm
      atom={atom}
      onSubmitSuccess={() => updatePopover.close(router)}
      showFormControl={false}
      submitRef={submitRef}
    />
  )
})

UpdateAtomPopover.displayName = 'UpdateAtomPopover'
