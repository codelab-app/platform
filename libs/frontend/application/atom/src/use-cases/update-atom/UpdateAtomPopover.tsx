'use client'

import type { IAtomModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'

import { useAtomService } from '../../services'
import { UpdateAtomForm } from './UpdateAtomForm'

export const UpdateAtomPopover = observer<{ atom: IAtomModel }>(({ atom }) => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { atomPopoverUpdate } = useAtomService()

  return (
    <CuiSidebarSecondary
      id={UiKey.AtomPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.AtomToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.AtomToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              atomPopoverUpdate.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Atom toolbar',
      }}
    >
      <UpdateAtomForm
        atom={atom}
        onSubmitSuccess={() => atomPopoverUpdate.close()}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
