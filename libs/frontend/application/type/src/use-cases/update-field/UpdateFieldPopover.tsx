'use client'

import type { IFieldModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'

import CloseOutlined from '@ant-design/icons/CloseOutlined'
import SaveOutlined from '@ant-design/icons/SaveOutlined'
import { type SubmitController, UiKey } from '@codelab/frontend/abstract/types'
import { CuiSidebarSecondary } from '@codelab/frontend/presentation/codelab-ui'
import { useValidatedUrlParams } from '@codelab/frontend-application-shared-store/router'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

import { useFieldService } from '../../services/field.service'
import { UpdateFieldForm } from './UpdateFieldForm'

export const UpdateFieldPopover = observer<{ field: IFieldModel }>(
  ({ field }) => {
    const router = useRouter()
    const submitRef = useRef<Maybe<SubmitController>>(undefined)
    const { updatePopover } = useFieldService()
    const params = useValidatedUrlParams()
    const closePopover = () => updatePopover.close(router, params)

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
            },
            {
              cuiKey: UiKey.FieldToolbarItemUpdateCancel,
              icon: <CloseOutlined />,
              label: 'Cancel',
              onClick: closePopover,
            },
          ],
          title: 'Update Field toolbar',
        }}
      >
        <UpdateFieldForm
          field={field}
          onSubmitSuccess={closePopover}
          showFormControl={false}
          submitRef={submitRef}
        />
      </CuiSidebarSecondary>
    )
  },
)
