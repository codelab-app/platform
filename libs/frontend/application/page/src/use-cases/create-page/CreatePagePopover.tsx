'use client'

import type {
  PageContextParams,
  SubmitController,
} from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { PageType, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebarSecondary,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { CreatePageForm } from './CreatePageForm'

export const CreatePagePopover = observer<PageContextParams>(
  ({ appId, pageId }) => {
    const submitRef = useRef<Maybe<SubmitController>>()
    const router = useRouter()

    const goToPageList = () => {
      router.push(PageType.PageList({ appId, pageId }))
    }

    return (
      <CuiSidebarSecondary
        id={UiKey.PagePopoverCreate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.PageToolbarItemCreate,
              icon: <SaveOutlined />,
              label: 'Create',
              onClick: () => {
                submitRef.current?.submit()
              },
              title: 'Create',
            },
            {
              cuiKey: UiKey.PageToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => {
                goToPageList()
              },
              title: 'Cancel',
            },
          ],
          title: 'Create Page toolbar',
        }}
      >
        <CreatePageForm
          onSubmitSuccess={() => goToPageList()}
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
