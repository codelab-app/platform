'use client'

import type { IFieldCreateRoute } from '@codelab/frontend/abstract/application'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useFieldService } from '../../services/field.service'
import { CreateFieldForm } from './CreateFieldForm'

interface CreateFieldPopoverProps {
  context: IFieldCreateRoute
}

export const CreateFieldPopover = ({ context }: CreateFieldPopoverProps) => {
  const {
    params: { interfaceId },
  } = context

  const router = useRouter()
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { createPopover } = useFieldService()
  const closePopover = () => createPopover.close(router, context)

  return (
    <CuiSidebarSecondary
      id={UiKey.FieldPopoverCreate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.FieldToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Create',
            onClick: () => submitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.FieldToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: closePopover,
          },
        ],
        title: 'Create Field toolbar',
      }}
    >
      <CreateFieldForm
        interfaceId={interfaceId}
        onSubmitSuccess={closePopover}
        showFormControl={false}
        submitRef={submitRef}
      />
    </CuiSidebarSecondary>
  )
}
