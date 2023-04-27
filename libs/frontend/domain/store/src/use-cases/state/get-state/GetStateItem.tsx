import { FileOutlined } from '@ant-design/icons'
import type { IField } from '@codelab/frontend/abstract/core'
import { fieldRef } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/presentation/view'
import { List, Space } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

export const GetStateItem = observer<{ field: IField }>(({ field }) => {
  const { fieldService } = useStore()

  const onEdit = () => {
    fieldService.updateModal.open(fieldRef(field.id))
  }

  const onDelete = () => {
    fieldService.deleteModal.open(fieldRef(field.id))
  }

  return (
    <List.Item style={{ padding: 8 }}>
      <Space style={{ width: '100%' }}>
        <FileOutlined />
        {field.name || field.key}
      </Space>
      <Space>
        <ListItemEditButton onClick={onEdit} />
        <ListItemDeleteButton onClick={onDelete} />
      </Space>
    </List.Item>
  )
})
