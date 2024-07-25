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
            cuiKey: MODEL_ACTION.CreateResource.key,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: MODEL_ACTION.CancelCreateResource.key,
            icon: <CloseOutlined />,
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
