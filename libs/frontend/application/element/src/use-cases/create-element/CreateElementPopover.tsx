'use client'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import { useRef } from 'react'
import { useCreateElementForm } from './create-element.state'
import { CreateElementForm } from './CreateElementForm'

export const CreateElementPopover = observer<{
  // Prevent builder ciricular dep
  selectedNode?: Nullable<IRuntimeModel>
}>(({ selectedNode }) => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createElementForm = useCreateElementForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreateElementPopover}
      label="Create Element"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateElementToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateElementToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              createElementForm.close()
              popover.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Element toolbar',
      }}
    >
      <CreateElementForm
        onSubmitSuccess={() => popover.close()}
        selectedNode={selectedNode}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
