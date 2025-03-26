'use client'

import type { ITypeModel } from '@codelab/frontend/abstract/domain'
import type { SubmitController } from '@codelab/frontend/abstract/types'
import type { Maybe } from '@codelab/shared/abstract/types'

import { CloseOutlined, SaveOutlined } from '@ant-design/icons/lib/icons'
import { UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useTypeService } from '../../services'
import { UpdateTypeForm } from './UpdateTypeForm'

interface UpdateTypeContainerProps {
  type: ITypeModel
}

export const UpdateTypePopover = ({ type }: UpdateTypeContainerProps) => {
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
            onClick: () => updatePopover.close(router),
          },
        ],
        title: 'Update Type',
      }}
    >
      <UpdateTypeForm
        onSubmitSuccess={() => updatePopover.close(router)}
        showFormControl={false}
        submitRef={submitRef}
        type={type}
      />
    </CuiSidebarSecondary>
  )
}
