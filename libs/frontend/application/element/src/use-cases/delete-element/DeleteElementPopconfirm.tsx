'use client'

import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { PopconfirmProps } from 'antd'
import type { ReactNode } from 'react'

import { getUiDataKey, type UiKey } from '@codelab/frontend/abstract/types'
import { loadingAtom } from '@codelab/frontend-application-shared-store/loading'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { useAsyncHandler } from '@codelab/frontend-presentation-components-form'
import { Popconfirm } from 'antd'
import { useSetAtom } from 'jotai'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { deleteElementUseCase } from './delete-element.use-case'

interface DeleteElementPopconfirmProps extends Partial<PopconfirmProps> {
  children: ReactNode
  element: IElementModel
  /**
   * Allow for unique identification of popconfirm, `delete-element-popconfirm` etc. Used for classname
   */
  uiKey:
    | UiKey.ElementPopconfirmFormDelete
    | UiKey.ElementPopconfirmOverlayDelete
}

export const DeleteElementPopconfirm = observer<DeleteElementPopconfirmProps>(
  ({ children, element, placement, uiKey }) => {
    const { elementDomainService } = useDomainStore()
    const { builderService } = useApplicationStore()
    const [open, setOpen] = useState(false)
    const asyncHandler = useAsyncHandler()

    const onConfirm = async () => {
      await deleteElementUseCase(element, elementDomainService, () =>
        builderService.selectPreviousElementOnDelete(),
      )
      setOpen(false)
    }

    return (
      <Popconfirm
        aria-label="Delete element confirmation"
        classNames={{ root: getUiDataKey(uiKey) }}
        // data-testid="delete-element-popconfirm"
        okText="Delete"
        onConfirm={asyncHandler(onConfirm)}
        onOpenChange={setOpen}
        open={open}
        placement={placement}
        title="Are you sure you want to delete element?"
      >
        {children}
      </Popconfirm>
    )
  },
)
