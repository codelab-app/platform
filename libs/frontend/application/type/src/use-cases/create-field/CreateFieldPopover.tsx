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
import { CreateFieldForm } from './CreateFieldForm'

export const CreateFieldPopover = observer(
  ({ interfaceId }: { interfaceId: string }) => {
    const router = useRouter()
    const submitRef = useRef<Maybe<SubmitController>>()
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
              onClick: () => submitRef.current?.submit(),
            },
            {
              cuiKey: UiKey.FieldToolbarItemCreateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: () => createPopover.close(router),
            },
          ],
          title: 'Create Field toolbar',
        }}
      >
        <CreateFieldForm
          interfaceId={interfaceId}
          onSubmitSuccess={() => createPopover.close(router)}
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
