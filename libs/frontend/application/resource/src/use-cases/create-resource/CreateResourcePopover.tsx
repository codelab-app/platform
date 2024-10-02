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

import { useCreateResourceForm } from './create-resource.state'
import { CreateResourceForm } from './CreateResourceForm'

export const CreateResourcePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createResourceForm = useCreateResourceForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.ResourcePopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ResourceToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.ResourceToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createResourceForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Resource toolbar',
      }}
    >
      <CreateResourceForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
