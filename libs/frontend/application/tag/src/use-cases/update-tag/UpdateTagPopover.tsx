'use client'

import type { ITagModel } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useTagService } from '../../services/tag.service'
import { UpdateTagForm } from './UpdateTagForm'

export const UpdateTagPopover = observer<{ tag: ITagModel }>(({ tag }) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { updatePopover } = useTagService()
  const router = useRouter()

  return (
    <CuiSidebarSecondary
      id={UiKey.TagPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.TagToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => submitRef.current?.submit(),
            title: 'Update',
          },
          {
            cuiKey: UiKey.TagToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => updatePopover.close(router),
            title: 'Cancel',
          },
        ],
        title: 'Update Tag toolbar',
      }}
    >
      <UpdateTagForm
        onSubmitSuccess={() => updatePopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
        tag={tag}
      />
    </CuiSidebarSecondary>
  )
})
