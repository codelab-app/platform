'use client'

import type { IRuntimeModel } from '@codelab/frontend/abstract/application'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useElementService } from '../../services/element.service'
import { useCreateElementForm } from './create-element.state'
import { CreateElementForm } from './CreateElementForm'

export const CreateElementPopover = observer<{
  // Prevent builder ciricular dep
  selectedNode?: Nullable<IRuntimeModel>
}>(({ selectedNode }) => {
  const router = useRouter()
  const submitRef = useRef<Maybe<SubmitController>>()
  const createElementForm = useCreateElementForm()
  const { createPopover } = useElementService()

  return (
    <CuiSidebarSecondary
      id={UiKey.ElementPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.ElementToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.ElementToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              createElementForm.close()
              createPopover.close(router)
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Element toolbar',
      }}
    >
      <CreateElementForm
        onSubmitSuccess={() => createPopover.close(router)}
        selectedNode={selectedNode}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
