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
import { CreateAuthGuardForm } from './CreateAuthGuardForm'

export const CreateAuthGuardPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { authGuardService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateAuthGuard.key}
      label="Create Auth Guard"
      toolbar={{
        items: [
          {
            icon: <SaveOutlined />,
            key: MODEL_ACTION.CreateAuthGuard.key,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            icon: <CloseOutlined />,
            key: MODEL_ACTION.CancelCreateAuthGuard.key,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              authGuardService.createForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create AuthGuard toolbar',
      }}
    >
      <CreateAuthGuardForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
