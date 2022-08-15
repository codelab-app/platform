import { FileOutlined } from '@ant-design/icons'
import { fieldRef, typeRef } from '@codelab/frontend/modules/type'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import {
  IField,
  IInterfaceType,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { List, Space } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'

export interface StateTreeItemProp {
  field: IField
  storeApiId: string
  typeService: ITypeService
}

export const GetStateItem = observer<StateTreeItemProp>(
  ({ field, typeService, storeApiId }) => {
    const onEdit = () => {
      typeService.fieldUpdateModal.open({
        field: fieldRef(field.id),
        interface: typeRef(storeApiId) as Ref<IInterfaceType>,
      })
    }

    const onDelete = () => {
      typeService.fieldDeleteModal.open({
        field: fieldRef(field.id),
        interface: typeRef(storeApiId) as Ref<IInterfaceType>,
      })
    }

    return (
      <List.Item style={{ padding: 8 }}>
        <Space style={{ width: '100%' }}>
          <FileOutlined />
          {field.name}
        </Space>
        <Space>
          <ListItemEditButton onClick={onEdit} />
          <ListItemDeleteButton onClick={onDelete} />
        </Space>
      </List.Item>
    )
  },
)
