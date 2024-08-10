'use client'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { useCreateActionForm } from './create-action.state'
import { CreateActionForm } from './CreateActionForm'

export const CreateActionPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createActionForm = useCreateActionForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreateActionPopover}
      label="Create Action"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateActionToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateActionToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createActionForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Action toolbar',
      }}
    >
      <CreateActionForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
