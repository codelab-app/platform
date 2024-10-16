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

import { useUpdateRedirectForm } from './update-redirect.state'
import { UpdateRedirectForm } from './UpdateRedirectForm'

export const UpdateRedirectPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const updateRedirectForm = useUpdateRedirectForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.RedirectPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.RedirectToolbarItemUpdate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: UiKey.RedirectToolbarItemUpdateCancel,
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
