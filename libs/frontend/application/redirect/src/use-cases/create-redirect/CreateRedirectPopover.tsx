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
import { useCreateRedirectForm } from './create-redirect.state'
import { CreateRedirectForm } from './CreateRedirectForm'

export const CreateRedirectPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createRedirectForm = useCreateRedirectForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateRedirect.key}
      label="Create Redirect"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.CreateRedirect.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateRedirect.key,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createRedirectForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Redirect toolbar',
      }}
    >
      <CreateRedirectForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
