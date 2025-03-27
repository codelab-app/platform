'use client'

import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import type {
  SubmitController,
  TreeViewSearchParams,
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
  params: TreeViewSearchParams
  type: ITypeModel
}

export const UpdateTypePopover = ({
  params,
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
            onClick: () => updatePopover.close(router, params),
          },
        ],
        title: 'Update Type',
      }}
    >
      <UpdateTypeForm
        onSubmitSuccess={() => updatePopover.close(router, params)}
        showFormControl={false}
        submitRef={submitRef}
        type={type}
      />
    </CuiSidebarSecondary>
  )
}
