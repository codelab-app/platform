'use client'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { useCreateElementForm } from './create-element.state'
import { CreateElementForm } from './CreateElementForm'

export const CreateElementPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createElementForm = useCreateElementForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateElement.key}
      label="Create Element"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.CreateElement.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateElement.key,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              createElementForm.close()
              popover.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Element toolbar',
      }}
    >
      <CreateElementForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
