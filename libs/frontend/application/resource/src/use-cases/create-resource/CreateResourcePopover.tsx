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
import { CreateResourceForm } from './CreateResourceForm'

export const CreateResourcePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { resourceService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.CreateResource.key}
      label="Create Resource"
      toolbar={{
        items: [
          {
            icon: <SaveOutlined />,
            key: MODEL_ACTION.CreateResource.key,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            icon: <CloseOutlined />,
            key: MODEL_ACTION.CancelCreateResource.key,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              resourceService.createForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Resource toolbar',
      }}
    >
      <CreateResourceForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
