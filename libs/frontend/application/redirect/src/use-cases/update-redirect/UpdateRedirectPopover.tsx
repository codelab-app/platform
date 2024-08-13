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
import { useUpdateRedirectForm } from './update-redirect.state'
import { UpdateRedirectForm } from './UpdateRedirectForm'

export const UpdateRedirectPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const updateRedirectForm = useUpdateRedirectForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.UpdateRedirectPopover}
      label="Update Redirect"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.UpdateRedirectToolbarItem,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: UiKey.CancelUpdateRedirectToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              updateRedirectForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Redirect toolbar',
      }}
    >
      <UpdateRedirectForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
