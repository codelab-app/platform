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
import { useStore } from '@codelab/frontend/infra/mobx'
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
            cuiKey: MODEL_ACTION.CreateAuthGuard.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateAuthGuard.key,
            icon: <CloseOutlined />,
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
