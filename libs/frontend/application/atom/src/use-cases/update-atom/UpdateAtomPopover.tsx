'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { MutableRefObject } from 'react'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
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
    <CuiSidebarSecondary
      id={UiKey.AtomPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.AtomToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: UiKey.AtomToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              updatePopover.close(router)
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Atom toolbar',
      }}
    >
      <UpdateAtomForm
        atom={atom}
        onSubmitSuccess={() => updatePopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})

UpdateAtomPopover.displayName = 'UpdateAtomPopover'
