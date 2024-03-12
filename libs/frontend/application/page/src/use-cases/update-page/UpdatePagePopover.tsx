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
import { UpdatePageForm } from './UpdatePageForm'

export const UpdatePagePopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { pageService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.UpdatePage.key}
      label="Update Page"
      toolbar={{
        items: [
          {
            icon: <SaveOutlined />,
            key: MODEL_ACTION.UpdatePage.key,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            icon: <CloseOutlined />,
            key: MODEL_ACTION.CancelUpdatePage.key,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              pageService.updateForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Page toolbar',
      }}
    >
      <UpdatePageForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
