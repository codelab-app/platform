import { FileOutlined } from '@ant-design/icons'
import { fieldRef, typeRef } from '@codelab/frontend/modules/type'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import {
  IField,
  IInterfaceType,
  IStore,
  ITypeService,
} from '@codelab/shared/abstract/core'
import { List, Space } from 'antd'
import { Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'

export interface StateTreeItemProp {
  field: IField
  typeService: ITypeService
  store: IStore
}

export const GetStateItem = observer<StateTreeItemProp>(
  ({ field, typeService, store }) => {
    const onEdit = () => {
      typeService.fieldUpdateModal.open({
        field: fieldRef(field.id),
        interface: typeRef(store.stateApiId) as Ref<IInterfaceType>,
      })
    }

    const onDelete = () => {
      typeService.fieldDeleteModal.open({
        field: fieldRef(field.id),
        interface: typeRef(store.stateApiId) as Ref<IInterfaceType>,
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
