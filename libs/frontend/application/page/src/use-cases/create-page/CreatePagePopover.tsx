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
import { useCreatePageForm } from './create-page.state'
import { CreatePageForm } from './CreatePageForm'

export const CreatePagePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createPageForm = useCreatePageForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreatePage.key}
      label="Create Page"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.CreatePage.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreatePage.key,
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
