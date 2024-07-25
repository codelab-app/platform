'use client'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/infra/mobx'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { CreateActionForm } from './CreateActionForm'

export const CreateActionPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { actionService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateAction.key}
      label="Create Action"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.CreateAction.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateAction.key,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              actionService.createForm.close()
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
