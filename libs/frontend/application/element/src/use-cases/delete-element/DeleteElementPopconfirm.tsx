import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { PopconfirmProps } from 'antd'
import type { ReactNode } from 'react'

import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { Popconfirm } from 'antd'
import { observer } from 'mobx-react-lite'

import { deleteElementUseCase } from './delete-element.use-case'

interface DeleteElementPopconfirmProps extends Partial<PopconfirmProps> {
  children: ReactNode
  element: IElementModel
}

export const DeleteElementPopconfirm = observer<DeleteElementPopconfirmProps>(
  ({ children, element, placement }) => {
    const { elementDomainService } = useDomainStore()
    const { builderService } = useApplicationStore()

    const onConfirm = () =>
      deleteElementUseCase(element, elementDomainService, () =>
        builderService.selectPreviousElementOnDelete(),
      )

    return (
      <Popconfirm
        okText="Delete"
        onConfirm={onConfirm}
        placement={placement}
        title="Are you sure you want to delete element?"
      >
        {children}
      </Popconfirm>
    )
  },
)
