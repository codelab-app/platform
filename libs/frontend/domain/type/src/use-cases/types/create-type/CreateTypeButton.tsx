import { PlusOutlined } from '@ant-design/icons'
import type { ITypeService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreateTypeButton = observer<{ typeService: ITypeService }>(
  ({ typeService }) => {
    return (
      <Button
        className="flex items-center justify-center"
        icon={<PlusOutlined />}
        onClick={() => typeService.createModal.open()}
        type="primary"
      >
        Create
      </Button>
    )
  },
)
