'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useTypeService } from '../../services'
import { CreateTypeForm } from './CreateTypeForm'

export const CreateTypePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { createPopover } = useTypeService()
  const router = useRouter()

  return (
    <CuiSidebarSecondary
      id={UiKey.TypePopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.TypeToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => submitRef.current?.submit(),
            title: 'Create',
          },
          {
            cuiKey: UiKey.TypeToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => createPopover.close(router),
            title: 'Cancel',
          },
        ],
        title: 'Create Type toolbar',
      }}
    >
      <CreateTypeForm
        onSubmitSuccess={() => createPopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
