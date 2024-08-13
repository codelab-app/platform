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
import { useCreatePageForm } from './create-page.state'
import { CreatePageForm } from './CreatePageForm'

export const CreatePagePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createPageForm = useCreatePageForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreatePagePopover}
      label="Create Page"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreatePageToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreatePageToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createPageForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Page toolbar',
      }}
    >
      <CreatePageForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
