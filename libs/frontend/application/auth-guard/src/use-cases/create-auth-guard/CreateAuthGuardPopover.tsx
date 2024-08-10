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
import { useCreateAuthGuardForm } from './create-auth-guard.state'
import { CreateAuthGuardForm } from './CreateAuthGuardForm'

export const CreateAuthGuardPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createAuthGuardForm = useCreateAuthGuardForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreateAuthGuardPopover}
      label="Create Auth Guard"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateAuthGuardToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateAuthGuardToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createAuthGuardForm.close()
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
