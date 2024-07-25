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
import React, { useRef } from 'react'
import { useCreateComponentForm } from './create-component.state'
import { CreateComponentForm } from './CreateComponentForm'

export const CreateComponentPopover = () => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createForm = useCreateComponentForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateComponent.key}
      label="Create Component"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.CreateComponent.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateComponent.key,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Component toolbar',
      }}
    >
      <CreateComponentForm
        onSubmitSuccess={() => popover.close()}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
}
