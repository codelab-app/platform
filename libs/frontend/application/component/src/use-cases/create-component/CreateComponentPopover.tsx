import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { useRef } from 'react'
import { useCreateComponentForm } from './create-component.state'
import { CreateComponentForm } from './CreateComponentForm'

export const CreateComponentPopover = () => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const createForm = useCreateComponentForm()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={UiKey.CreateComponentPopover}
      label="Create Component"
      toolbar={{
        items: [
          {
            cuiKey: UiKey.CreateComponentToolbarItem,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.CancelCreateComponentToolbarItem,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              popover.close()
              createForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Component toolbar',
      }}
    >
      <CreateComponentForm
        onSubmitSuccess={() => popover.close()}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
}
