'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'

import { useUpdateFieldForm } from './update-field.state'
import { UpdateFieldForm } from './UpdateFieldForm'

export const UpdateFieldPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const updateFieldForm = useUpdateFieldForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.FieldPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.FieldToolbarItemUpdate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: UiKey.FieldToolbarItemUpdateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              updateFieldForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Field toolbar',
      }}
    >
      <UpdateFieldForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
