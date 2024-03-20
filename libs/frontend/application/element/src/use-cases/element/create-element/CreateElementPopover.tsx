import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { CreateElementForm } from './CreateElementForm'

export const CreateElementPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { elementService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateElement.key}
      label="Create Element"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.CreateElement.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              console.log('CreateElement clicked!')
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateElement.key,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              elementService.createForm.close()
              popover.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Element toolbar',
      }}
    >
      <CreateElementForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
