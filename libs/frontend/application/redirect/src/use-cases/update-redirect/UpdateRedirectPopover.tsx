import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import {
  MODEL_ACTION,
  type SubmitController,
} from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { UpdateRedirectForm } from './UpdateRedirectForm'

export const UpdateRedirectPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { redirectService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={MODEL_ACTION.UpdateRedirect.key}
      label="Update Redirect"
      toolbar={{
        items: [
          {
            cuiKey: MODEL_ACTION.UpdateRedirect.key,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Update',
          },
          {
            cuiKey: MODEL_ACTION.CancelUpdateRedirect.key,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              redirectService.updateForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Update Redirect toolbar',
      }}
    >
      <UpdateRedirectForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
