'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useRef } from 'react'

import { useAuthGuardService } from '../../services/auth-guard.service'
import { CreateAuthGuardForm } from './CreateAuthGuardForm'

export const CreateAuthGuardPopover = () => {
  console.log('CreateAuthGuardPopover')

  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const router = useRouter()
  const { createPopover } = useAuthGuardService()

  // Memoize the close handler to prevent re-renders
  const handleClose = useCallback(() => {
    createPopover.close(router)
  }, [])

  // Memoize the submit handler
  const handleSubmit = useCallback(() => {
    submitRef.current?.submit()
  }, [])

  // Memoize toolbar items to prevent re-renders
  const toolbarItems = useMemo(
    () => [
      {
        cuiKey: UiKey.AuthGuardToolbarItemCreate,
        icon: <SaveOutlined />,
        label: 'Create',
        onClick: handleSubmit,
      },
      {
        cuiKey: UiKey.AuthGuardToolbarItemCreateCancel,
        icon: <CloseOutlined />,
        label: 'Cancel',
        onClick: handleClose,
      },
    ],
    [],
  )

  return (
    <CuiSidebarSecondary
      id={UiKey.AuthGuardPopoverCreate}
      toolbar={{
        items: toolbarItems,
        title: 'Create AuthGuard toolbar',
      }}
    >
      <CreateAuthGuardForm
        onSubmitSuccess={handleClose}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}
