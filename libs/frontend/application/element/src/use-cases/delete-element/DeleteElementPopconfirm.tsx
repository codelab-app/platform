'use client'

import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { PopconfirmProps } from 'antd'
import type { ReactNode } from 'react'

import { getUiDataKey, type UiKey } from '@codelab/frontend/abstract/types'
import { useAsyncHandler } from '@codelab/frontend-presentation-components-form'
import { Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { useElementService } from '../../services/clone-element.service'

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
    const elemnetService = useElementService()
    const [open, setOpen] = useState(false)
    const asyncHandler = useAsyncHandler()

    const onConfirm = async () => {
      await elemnetService.remove(element)
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
