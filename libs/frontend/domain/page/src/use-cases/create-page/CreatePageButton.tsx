import { PlusOutlined } from '@ant-design/icons'
import { IPageService } from '@codelab/frontend/abstract/core'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const CreatePageButton = observer<{ pageService: IPageService }>(
  ({ pageService }) => {
    const onClick = () => pageService.createModal.open()

    return (
      <Button
        icon={<PlusOutlined />}
        onClick={onClick}
        size="small"
        type="primary"
      />
    )
  },
)
