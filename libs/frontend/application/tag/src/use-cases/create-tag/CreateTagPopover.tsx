import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import { useStore } from '@codelab/frontend/infra/mobx'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { CreateTagForm } from './CreateTagForm'

export const CreateTagPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { tagService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateTag.key}
      label="Create Tag"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.CreateTag.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateTag.key,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              tagService.createForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Tag toolbar',
      }}
    >
      <CreateTagForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
