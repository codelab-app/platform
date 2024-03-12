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
import { UpdateFieldForm } from './UpdateFieldForm'

export const UpdateFieldPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { fieldService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.UpdateField.key}
      label="Update Field"
      toolbar={{
        items: [
          {
            icon: <SaveOutlined />,
            key: MODEL_ACTION.UpdateField.key,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            icon: <CloseOutlined />,
            key: MODEL_ACTION.CancelUpdateField.key,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              fieldService.updateForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Field toolbar',
      }}
    >
      <UpdateFieldForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
