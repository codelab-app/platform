'use client'

import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useFieldService } from '../../services/field.service'
import { useCreateFieldForm } from './create-field.state'
import { CreateFieldForm } from './CreateFieldForm'

export const CreateFieldPopover = observer(() => {
  const router = useRouter()
  const submitRef = useRef<Maybe<SubmitController>>()
  const createFieldForm = useCreateFieldForm()
  const { createPopover } = useFieldService()

  return (
    <CuiSidebarSecondary
      id={UiKey.FieldPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.FieldToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => {
              submitRef.current?.submit()
            },
            title: 'Create',
          },
          {
            cuiKey: UiKey.FieldToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => {
              createPopover.close(router)
              createFieldForm.close()
            },
            title: 'Cancel',
          },
        ],
        title: 'Create Field toolbar',
      }}
    >
      <CreateFieldForm
        onSubmitSuccess={() => createPopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
