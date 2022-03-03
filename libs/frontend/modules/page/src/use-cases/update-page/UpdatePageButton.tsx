import { EditOutlined } from '@ant-design/icons'
import { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { PageStore } from '../../store'

export interface UpdatePageButtonProps extends UpdateButtonProps {
  pages: PageStore
}

export const UpdatePageButton = observer(
  ({ id, pages, disabled }: UpdatePageButtonProps) => {
    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={() => {
          if (!id) {
            throw new Error('Page ID is not valid')
          }

          pages.updateModal.open(id)
        }}
        size="small"
        type="primary"
      />
    )
  },
)
