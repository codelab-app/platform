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

import { useCreateTagForm } from './create-tag.data'
import { CreateTagForm } from './CreateTagForm'

export const CreateTagPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createTagForm = useCreateTagForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.TagPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.TagToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.TagToolabarItemCreateCancel,
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
