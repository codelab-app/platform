'use client'

import type { PageContextParams } from '@codelab/frontend-abstract-application'
import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useRedirectService } from '../../services/redirect.service'
import { CreateRedirectForm } from './CreateRedirectForm'

export const CreateRedirectPopover = observer<{ params: PageContextParams }>(
  ({ params: { appId, pageId } }) => {
    const { createPopover } = useRedirectService()
    const submitRef = useRef<Maybe<SubmitController>>(undefined)
    const router = useRouter()

    return (
      <CuiSidebarSecondary
        id={UiKey.RedirectPopoverCreate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.RedirectToolbarItemCreate,
              icon: <SaveOutlined />,
              label: 'Create',
              onClick: () => submitRef.current?.submit(),
            },
            {
              cuiKey: UiKey.RedirectToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => createPopover.close(router, { appId, pageId }),
            },
          ],
          title: 'Create Redirect toolbar',
        }}
      >
        <CreateRedirectForm
          onSubmitSuccess={() => createPopover.close(router, { appId, pageId })}
          pageId={pageId}
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
