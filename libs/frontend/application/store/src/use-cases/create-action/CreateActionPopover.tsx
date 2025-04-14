'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useActionService } from '../../services/action.service'
import { CreateActionForm } from './CreateActionForm'

export const CreateActionPopover = observer(
  ({ storeId }: { storeId: string }) => {
    const submitRef = useRef<Maybe<SubmitController>>(undefined)
    const router = useRouter()
    const { createPopover } = useActionService()

    return (
      <CuiSidebarSecondary
        id={UiKey.ActionPopoverCreate}
        toolbar={{
          items: [
            {
              cuiKey: UiKey.ActionToolbarItemCreate,
              icon: <SaveOutlined />,
              label: 'Create',
              onClick: () => {
                submitRef.current?.submit()
              },
              title: 'Create',
            },
            {
              cuiKey: UiKey.ActionToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => createPopover.close(router),
              title: 'Cancel',
            },
          ],
          title: 'Create Action toolbar',
        }}
      >
        <CreateActionForm
          onSubmitSuccess={() => createPopover.close(router)}
          showFormControl={false}
          storeId={storeId}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
