'use client'

import type { IResourceModel } from '@codelab/frontend-abstract-domain'
import type { Maybe } from '@codelab/shared-abstract-types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend-abstract-types'
import { CuiSidebarSecondary } from '@codelab/frontend-presentation-codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useResourceService } from '../../services/resource.service'
import { UpdateResourceForm } from './UpdateResourceForm'

export const UpdateResourcePopover = observer<{ resource: IResourceModel }>(
  ({ resource }) => {
    const submitRef = useRef<Maybe<SubmitController>>(undefined)
    const { updatePopover } = useResourceService()
    const router = useRouter()

    return (
      <CuiSidebarSecondary
        id={UiKey.ResourcePopoverUpdate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.ResourceToolbarItemUpdate,
              icon: <SaveOutlined />,
              label: 'Update',
              onClick: () => submitRef.current?.submit(),
              title: 'Update',
            },
            {
              cuiKey: UiKey.ResourceToolbarItemUpdateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => updatePopover.close(router),
              title: 'Cancel',
            },
          ],
          title: 'Update Resource toolbar',
        }}
      >
        <UpdateResourceForm
          onSubmitSuccess={() => updatePopover.close(router)}
          resource={resource}
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
