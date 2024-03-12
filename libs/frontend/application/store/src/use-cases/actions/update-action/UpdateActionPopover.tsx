import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { UpdateActionForm } from './UpdateActionForm'

export const UpdateActionPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { actionService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.UpdateAction.key}
      label="Update Action"
      toolbar={{
        items: [
          {
            icon: <SaveOutlined />,
            key: MODEL_ACTION.UpdateAction.key,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            icon: <CloseOutlined />,
            key: MODEL_ACTION.CancelUpdateAction.key,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              actionService.updateForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Action toolbar',
      }}
    >
      <UpdateActionForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
