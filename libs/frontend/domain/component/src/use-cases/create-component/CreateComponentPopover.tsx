import { CloseOutlined, SaveOutlined } from '@ant-design/icons'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { FormNames } from '@codelab/frontend/abstract/types'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation//codelab-ui'
import { useStore } from '@codelab/frontend/presentation/container'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { CreateComponentForm } from './CreateComponentForm'

export const CreateComponentPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { componentService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={FormNames.CreateComponent}
      label="Create Component"
      toolbar={{
        items: [
          {
            icon: <SaveOutlined />,
            key: 'Create',
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            icon: <CloseOutlined />,
            key: 'Cancel',
            label: 'Cancel',
            onClick: () => {
              popover.close()
              componentService.createForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Component toolbar',
      }}
    >
      <CreateComponentForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
