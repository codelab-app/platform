import {
  EntityType,
  ListItemDeleteButton,
  ListItemSettingsButton,
  useCRUDModalForm,
} from '@codelab/frontend/shared'
import { useGetPropTypeCListQuery } from '@codelab/hasura'
import { List, Space, Spin } from 'antd'
import React from 'react'

export const GetPropTypeCList = () => {
  const { openDeleteModal, openUpdateModal } = useCRUDModalForm(
    EntityType.PropTypeC,
  )

  // TODO add filter by library
  const { data, loading } = useGetPropTypeCListQuery({})

  return loading ? (
    <Spin />
  ) : (
    <List
      size="small"
      dataSource={data?.prop_type_c}
      renderItem={(propTypeC) => (
        <List.Item onMouseOver={() => null} style={{ paddingLeft: 0 }}>
          <Space style={{ width: '100%' }}>{propTypeC.label}</Space>
          <Space>
            <ListItemSettingsButton
              onClick={() => openUpdateModal(propTypeC.id)}
            />
            <ListItemDeleteButton
              onClick={() => openDeleteModal([propTypeC.id])}
            />
          </Space>
        </List.Item>
      )}
    />
  )
}
