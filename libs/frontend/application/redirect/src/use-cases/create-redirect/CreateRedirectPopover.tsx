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

import { useCreateRedirectForm } from './create-redirect.state'
import { CreateRedirectForm } from './CreateRedirectForm'

export const CreateRedirectPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createRedirectForm = useCreateRedirectForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.RedirectPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.RedirectToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.RedirectToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createRedirectForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Redirect toolbar',
      }}
    >
      <CreateRedirectForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
