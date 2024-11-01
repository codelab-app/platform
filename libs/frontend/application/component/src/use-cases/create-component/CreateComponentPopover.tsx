'use client'

import type { IRef } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { CreateComponentForm } from './CreateComponentForm'

export const CreateComponentPopover = () => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const router = useRouter()
  const goBack = () => router.back()
  const { userDomainService } = useDomainStore()
  const owner = userDomainService.user

  return (
    <CuiSidebarSecondary
      id={UiKey.ComponentPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ComponentToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.ComponentToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              goBack()
            },
            title: 'Cancel',
          },
        ],
        title: 'Toolbar',
      }}
    >
      <CreateComponentForm
        onSubmitSuccess={() => goBack()}
        owner={owner}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}
