'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useResourceService } from '../../services/resource.service'
import { CreateResourceForm } from './CreateResourceForm'

export const CreateResourcePopover = () => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { createPopover } = useResourceService()
  const router = useRouter()

  return (
    <CuiSidebarSecondary
      id={UiKey.ResourcePopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ResourceToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => submitRef.current?.submit(),
            title: 'Create',
          },
          {
            cuiKey: UiKey.ResourceToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => createPopover.close(router),
            title: 'Cancel',
          },
        ],
        title: 'Create Resource toolbar',
      }}
    >
      <CreateResourceForm
        onSubmitSuccess={() => createPopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}
