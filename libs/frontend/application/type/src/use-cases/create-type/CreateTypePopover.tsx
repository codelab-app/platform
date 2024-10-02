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

import { useCreateTypeForm } from './create-type.state'
import { CreateTypeForm } from './CreateTypeForm'

export const CreateTypePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createTypeForm = useCreateTypeForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.TypePopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.TypeToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.TypeToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createTypeForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Type toolbar',
      }}
    >
      <CreateTypeForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
