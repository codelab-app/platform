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
import { useCreateResourceForm } from './create-resource.state'
import { CreateResourceForm } from './CreateResourceForm'

export const CreateResourcePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createResourceForm = useCreateResourceForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreateResourcePopover}
      label="Create Resource"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateResourceToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateResourceToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createResourceForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Resource toolbar',
      }}
    >
      <CreateResourceForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
