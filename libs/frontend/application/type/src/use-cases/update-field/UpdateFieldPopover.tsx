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
import { UpdateFieldForm } from './UpdateFieldForm'

export const UpdateFieldPopover = observer<{ id: string }>(({ id }) => {
  const router = useRouter()
  const submitRef = useRef<Maybe<SubmitController>>()
  const { updatePopover } = useFieldService()

  return (
    <CuiSidebarSecondary
      id={UiKey.FieldPopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.FieldToolbarItemUpdate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => submitRef.current?.submit(),
            title: 'Update',
          },
          {
            cuiKey: UiKey.FieldToolbarItemUpdateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => updatePopover.close(router),
            title: 'Cancel',
          },
        ],
        title: 'Update Field toolbar',
      }}
    >
      <UpdateFieldForm
        id={id}
        onSubmitSuccess={() => updatePopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
})
