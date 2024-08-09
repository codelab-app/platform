'use client'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import {
  type SubmitController,
  UiDataRecord,
  UiKey,
} from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { useCreateAtomModal } from './create-atom.state'
import { CreateAtomForm } from './CreateAtomForm'

export const CreateAtomPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createAtomForm = useCreateAtomModal()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiDataRecord.CreateAtomPopover.key}
      label={UiDataRecord.CreateAtomPopover.label}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateAtomToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateAtomToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createAtomForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Atom toolbar',
      }}
    >
      <CreateAtomForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
