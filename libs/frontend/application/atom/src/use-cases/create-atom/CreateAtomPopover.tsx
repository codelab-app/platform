'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'

import { useAtomService } from '../../services'
import { CreateAtomForm } from './CreateAtomForm'

export const CreateAtomPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { atomPopoverCreate } = useAtomService()

  return (
    <CuiSidebarSecondary
      id={UiKey.AtomPopoverCreate}
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
              atomPopoverCreate.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Atom toolbar',
      }}
    >
      <CreateAtomForm
        onSubmitSuccess={() => atomPopoverCreate.close()}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
