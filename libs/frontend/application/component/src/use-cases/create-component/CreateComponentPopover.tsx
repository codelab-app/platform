'use client'

import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { RoutePaths } from '@codelab/frontend-abstract-application'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { useDomainStore } from '@codelab/frontend-infra-mobx-context'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { CreateComponentForm } from './CreateComponentForm'

export const CreateComponentPopover = () => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const router = useRouter()
  const closePopover = () => router.push(RoutePaths.Component.base())
  const { userDomainService } = useDomainStore()
  const owner = userDomainService.currentUser

  return (
    <CuiSidebarSecondary
      id={UiKey.ComponentPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ComponentToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => submitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.ComponentToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => closePopover(),
          },
        ],
        title: 'Toolbar',
      }}
    >
      <CreateComponentForm
        onSubmitSuccess={() => closePopover()}
        owner={owner}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}
