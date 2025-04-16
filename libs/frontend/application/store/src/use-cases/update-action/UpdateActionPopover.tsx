'use client'

import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useActionService } from '../../services/action.service'
import { UpdateActionForm } from './UpdateActionForm'

export const UpdateActionPopover = observer(({ id }: { id: string }) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { updatePopover } = useActionService()
  const router = useRouter()

  return (
    <CuiSidebarSecondary
      id={UiKey.ActionPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ActionToolbarItemUpdate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => submitRef.current?.submit(),
            title: 'Update',
          },
          {
            cuiKey: UiKey.ActionToolbarItemUpdateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => updatePopover.close(router),
            title: 'Cancel',
          },
        ],
        title: 'Update Action toolbar',
      }}
    >
      <UpdateActionForm
        actionId={id}
        onSubmitSuccess={() => updatePopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
