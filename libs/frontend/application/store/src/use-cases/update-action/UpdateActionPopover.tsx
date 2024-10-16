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

import { useUpdateActionForm } from './update-action.state'
import { UpdateActionForm } from './UpdateActionForm'

export const UpdateActionPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const updateActionForm = useUpdateActionForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.ActionPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ActionToolbarItemUpdate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: UiKey.ActionToolbarItemUpdateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              updateActionForm.close()
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
