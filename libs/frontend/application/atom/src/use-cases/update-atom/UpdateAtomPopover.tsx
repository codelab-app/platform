'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useAtomService } from '../../services'
import { UpdateAtomForm } from './UpdateAtomForm'

export const UpdateAtomPopover = observer<{ atom: IAtomModel }>(({ atom }) => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { atomPopoverUpdate } = useAtomService()
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
              atomPopoverUpdate.close(router)
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Atom toolbar',
      }}
    >
      <UpdateAtomForm
        atom={atom}
        onSubmitSuccess={() => atomPopoverUpdate.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
