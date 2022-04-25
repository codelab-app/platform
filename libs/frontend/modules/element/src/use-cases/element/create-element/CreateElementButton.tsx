import { PlusOutlined } from '@ant-design/icons'
import { ELEMENT_SERVICE, WithServices } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { elementRef } from '../../../store'

export type CreateElementButtonProps = WithServices<ELEMENT_SERVICE> & {
  parentElementId?: string
}

export const CreateElementButton = observer<CreateElementButtonProps>(
  ({ parentElementId, elementService }) => {
    return (
      <Button
        icon={<PlusOutlined data-testid="create-page-element-button" />}
        onClick={() =>
          elementService.createModal.open({
            parentElement: parentElementId
              ? elementRef(parentElementId)
              : undefined,
          })
        }
      />
    )
  },
)
