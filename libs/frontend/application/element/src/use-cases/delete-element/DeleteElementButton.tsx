import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import { elementRef } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/infra/mobx'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface DeleteElementProps {
  className?: string
  disabled: boolean
  runtimeElement: IRuntimeElementModel
}

export const DeleteElementButton = observer<DeleteElementProps>(
  ({ className, disabled, runtimeElement }) => {
    const { elementService } = useStore()
    const element = runtimeElement.element.current
    const onClick = () => elementService.deleteModal.open(elementRef(element))

    return (
      <Button
        className={className}
        danger
        disabled={disabled}
        onClick={onClick}
      >
        Delete
      </Button>
    )
  },
)
