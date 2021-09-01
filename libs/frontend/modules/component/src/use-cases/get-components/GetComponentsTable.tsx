import { ApartmentOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/model/state/router'
import {
  EntityType,
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
  useCrudModalForm,
} from '@codelab/frontend/view/components'
import { Space, Spin, Table, TableColumnProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import tw from 'twin.macro'
import { ComponentFragment } from '../../Component.fragment.api.graphql'
import { useGetComponentsQuery } from './GetComponents.api.graphql'

export const GetComponentsTable = () => {
  const router = useRouter()

  const { openDeleteModal, openUpdateModal } = useCrudModalForm(
    EntityType.Component,
  )

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<ComponentFragment>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      render: (name, component) => (
        <Link
          href={{
            pathname: PageType.ComponentDetail,
            query: { componentId: component.id },
          }}
        >
          <a>{name}</a>
        </Link>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (_, record) => (
        <Space size="middle">
          <ListItemButton
            onClick={() =>
              router.push({
                pathname: PageType.ComponentDetail,
                query: { componentId: record.id },
              })
            }
            icon={<ApartmentOutlined />}
          />

          <ListItemEditButton
            onClick={() => openUpdateModal(record.id, record)}
          />

          <ListItemDeleteButton
            onClick={() => openDeleteModal([record.id], record)}
          />
        </Space>
      ),
    },
  ]

  const { data, loading } = useGetComponentsQuery()
  const components = data?.getComponents

  if (loading) {
    return <Spin />
  }

  return (
    <Table
      pagination={{ position: ['bottomCenter'] }}
      dataSource={components}
      columns={columns}
      rowKey={(component) => component.id}
    />
  )
}
