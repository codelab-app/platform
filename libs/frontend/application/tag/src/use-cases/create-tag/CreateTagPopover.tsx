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
import { useCreateTagForm } from './create-tag.data'
import { CreateTagForm } from './CreateTagForm'

export const CreateTagPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createTagForm = useCreateTagForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreateTagPopover}
      label="Create Tag"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateTagToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateTagToolabarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createTagForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Tag toolbar',
      }}
    >
      <CreateTagForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
