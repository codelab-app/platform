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
import { useCreateFieldForm } from './create-field.state'
import { CreateFieldForm } from './CreateFieldForm'

export const CreateFieldPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createFieldForm = useCreateFieldForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreateFieldPopover}
      label="Create Field"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateFieldToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateFieldToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createFieldForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Field toolbar',
      }}
    >
      <CreateFieldForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
