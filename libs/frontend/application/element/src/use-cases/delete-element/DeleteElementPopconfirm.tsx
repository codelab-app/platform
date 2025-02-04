'use client'

import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { PopconfirmProps } from 'antd'
import type { ReactNode } from 'react'

import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'

import { deleteElementUseCase } from './delete-element.use-case'

interface DeleteElementPopconfirmProps extends Partial<PopconfirmProps> {
  children: ReactNode
  element: IElementModel
}

export const DeleteElementPopconfirm = observer<DeleteElementPopconfirmProps>(
  ({ children, element, placement }) => {
    const { elementDomainService } = useDomainStore()
    const { builderService } = useApplicationStore()
    const [open, setOpen] = useState(false)

    const onConfirm = async () => {
      await deleteElementUseCase(element, elementDomainService, () =>
        builderService.selectPreviousElementOnDelete(),
      )
      setOpen(false)
    }

    return (
      <Popconfirm
        okText="Delete"
        onConfirm={onConfirm}
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
