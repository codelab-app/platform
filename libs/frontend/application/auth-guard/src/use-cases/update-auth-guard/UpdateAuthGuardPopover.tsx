'use client'

import type { IAuthGuardModel } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useAuthGuardService } from '../../services/auth-guard.service'
import { UpdateAuthGuardForm } from './UpdateAuthGuardForm'

export const UpdateAuthGuardPopover = observer<{ authGuard: IAuthGuardModel }>(
  ({ authGuard }) => {
    const submitRef = useRef<Maybe<SubmitController>>(undefined)
    const router = useRouter()
    const { updatePopover } = useAuthGuardService()

    return (
      <CuiSidebarSecondary
        id={UiKey.AuthGuardPopoverUpdate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.AuthGuardToolbarItemCreate,
              icon: <SaveOutlined />,
              label: 'Update',
              onClick: () => submitRef.current?.submit(),
            },
            {
              cuiKey: UiKey.AuthGuardToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => updatePopover.close(router),
            },
          ],
          title: 'Update AuthGuard',
        }}
      >
        <UpdateAuthGuardForm
          authGuard={authGuard}
          onSubmitSuccess={() => updatePopover.close(router)}
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
