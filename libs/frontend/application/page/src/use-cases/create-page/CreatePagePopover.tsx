'use client'

import type { IAppModel, IPageModel } from '@codelab/frontend/abstract/domain'
import type {
  PageContextParams,
  SubmitController,
} from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { usePageService } from '../../services/page.service'
import { CreatePageForm } from './CreatePageForm'

interface ICreatePagePopoverProps {
  appId: string
  pageId: string
}

export const CreatePagePopover = observer<ICreatePagePopoverProps>(
  ({ appId, pageId }) => {
    const submitRef = useRef<Maybe<SubmitController>>(undefined)
    const router = useRouter()
    const { createPopover } = usePageService()

    return (
      <CuiSidebarSecondary
        id={UiKey.PagePopoverCreate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.PageToolbarItemCreate,
              icon: <SaveOutlined />,
              label: 'Create',
              onClick: () => submitRef.current?.submit(),
            },
            {
              cuiKey: UiKey.PageToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => createPopover.close(router, { appId, pageId }),
            },
          ],
          title: 'Create Page toolbar',
        }}
      >
        <CreatePageForm
          appId={appId}
          onSubmitSuccess={() =>
            createPopover.close(router, {
              appId,
              pageId,
            })
          }
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
