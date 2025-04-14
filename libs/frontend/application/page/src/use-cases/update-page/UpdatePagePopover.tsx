'use client'

import type { IPageModel } from '@codelab/frontend/abstract/domain'
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

export const UpdatePagePopover = observer<{ page: IPageModel; appId: string }>(
  ({ appId, page }) => {
    const submitRef = useRef<Maybe<SubmitController>>(undefined)
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
              onClick: () =>
                updatePopover.close(router, { appId, pageId: page.id }),
            },
          ],
          title: 'Update Page toolbar',
        }}
      >
        <UpdatePageForm
          appId={appId}
          onSubmitSuccess={() =>
            updatePopover.close(router, { appId, pageId: page.id })
          }
          page={page}
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
