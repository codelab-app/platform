import { EditOutlined } from '@ant-design/icons'
import type { UpdateButtonProps } from '@codelab/frontend/abstract/types'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import type { PageService } from '../../store'
import { pageRef } from '../../store'

export interface UpdatePageButtonProps extends UpdateButtonProps {
  pages: PageService
}

export const UpdatePageButton = observer(
  ({ disabled, id, pages }: UpdatePageButtonProps) => {
    return (
      <Button
        disabled={disabled}
        ghost
        icon={<EditOutlined />}
        onClick={() => {
          if (!id) {
            throw new Error('Page ID is not valid')
          }

          const page = pages.page(id)

          if (!page) {
            throw new Error('Page is not valid')
          }

          pages.updateModal.open(pageRef(page))
        }}
        size="small"
        type="primary"
      />
    )
  },
)
