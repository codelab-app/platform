import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import { FormNames } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import {
  CuiSidebarPopover,
  useCui,
} from '@codelab/frontend/presentation/codelab-ui'
import type { Maybe } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import { CreateFieldForm } from './CreateFieldForm'

export const CreateFieldPopover = observer(() => {
  const submitRef = useRef<Maybe<SubmitController>>()
  const { fieldService } = useStore()
  const { popover } = useCui()

  return (
    <CuiSidebarPopover
      id={FormNames.CreateField}
      label="Create Field"
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
              fieldService.createForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Field toolbar',
      }}
    >
      <CreateFieldForm
        onSubmitSuccess={() => popover.close()}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarPopover>
  )
})
