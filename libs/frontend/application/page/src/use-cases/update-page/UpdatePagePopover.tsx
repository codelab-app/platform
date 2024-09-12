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
import { useRef } from 'react'
import { useUpdatePageForm } from './update-page.state'
import { UpdatePageForm } from './UpdatePageForm'

export const UpdatePagePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const updatePageForm = useUpdatePageForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.UpdatePagePopover}
      label="Update Page"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.UpdatePageToolbarItem,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: UiKey.CancelUpdatePageToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              updatePageForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Page toolbar',
      }}
    >
      <UpdatePageForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
