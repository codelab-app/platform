'use client'

import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { useRouter } from 'next/navigation'
import { useMemo, useRef } from 'react'

import { useAuthGuardService } from '../../services/auth-guard.service'
import { CreateAuthGuardForm } from './CreateAuthGuardForm'

export const CreateAuthGuardPopover = () => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const router = useRouter()
  const { createPopover } = useAuthGuardService()

  const items = useMemo(
    () => [
      {
        cuiKey: UiKey.AuthGuardToolbarItemCreate,
        icon: <SaveOutlined />,
        label: 'Create',
        onClick: () => submitRef.current?.submit(),
      },
      {
        cuiKey: UiKey.AuthGuardToolbarItemCreateCancel,
        icon: <CloseOutlined />,
        label: 'Cancel',
        onClick: () => createPopover.close(router),
      },
    ],
    [],
  )

  return (
    <CuiSidebarSecondary
      id={UiKey.AuthGuardPopoverCreate}
      toolbar={{
        items,
        title: 'Create AuthGuard toolbar',
      }}
    >
      <CreateAuthGuardForm
        onSubmitSuccess={() => createPopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}
