'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { usePageService } from '../../services/page.service'
import { UpdatePageForm } from './UpdatePageForm'

export const UpdatePagePopover = observer<{ id: string }>(({ id }) => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const router = useRouter()
  const { updatePopover } = usePageService()

  return (
    <CuiSidebarSecondary
      id={UiKey.PagePopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.PageToolbarItemUpdate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => submitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.PageToolbarItemUpdateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => updatePopover.close(router),
          },
        ],
        title: 'Update Page toolbar',
      }}
    >
      <UpdatePageForm
        id={id}
        onSubmitSuccess={() => updatePopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
