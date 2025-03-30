'use client'

import type { ITypeUpdateRoute } from '@codelab/frontend/abstract/application'
import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import type {
  SubmitController,
  TreeViewClientProps,
} from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons/lib/icons'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useTypeService } from '../../services'
import { UpdateTypeForm } from './UpdateTypeForm'

interface UpdateTypeContainerProps {
  context: ITypeUpdateRoute
  type: ITypeModel
}

export const UpdateTypePopover = ({
  context,
  type,
}: UpdateTypeContainerProps) => {
  const submitRef = useRef<Maybe<SubmitController>>(undefined)
  const { updatePopover } = useTypeService()
  const router = useRouter()

  return (
    <CuiSidebarSecondary
      id={UiKey.TypePopoverUpdate}
      toolbar={{
        items: [
          {
            cuiKey: UiKey.TypeToolbarItemCreate,
            icon: <SaveOutlined />,
            label: 'Update',
            onClick: () => submitRef.current?.submit(),
          },
          {
            cuiKey: UiKey.TypeToolbarItemCreateCancel,
            icon: <CloseOutlined />,
            label: 'Cancel',
            onClick: () => updatePopover.close(router, context),
          },
        ],
        title: 'Update Type',
      }}
    >
      <UpdateTypeForm
        onSubmitSuccess={() => updatePopover.close(router, context)}
        showFormControl={false}
        submitRef={submitRef}
        type={type}
      />
    </CuiSidebarSecondary>
  )
}
