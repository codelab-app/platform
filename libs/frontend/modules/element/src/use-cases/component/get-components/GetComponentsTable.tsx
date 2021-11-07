import { ApartmentOutlined } from '@ant-design/icons'
import { IElement } from '@codelab/frontend/abstract/core'
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
import { useGetComponentsQuery } from '../../../graphql/component.endpoints.graphql.gen'

export const GetComponentsTable = () => {
  const router = useRouter()
  const { openUpdateModal } = useCrudModalForm(EntityType.Tag)
  const { openDeleteModal } = useCrudModalForm(EntityType.Element)

  const headerCellProps = () => ({
    style: tw`font-semibold text-gray-900`,
  })

  const columns: Array<TableColumnProps<IElement>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      render: (_, component) => (
        <Link
          href={{
            pathname: PageType.ComponentDetail,
            query: { componentId: component.id },
          }}
        >
          <a>{component.componentTag?.name}</a>
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
            onClick={() => {
              if (record.componentTag) {
                openUpdateModal(record.componentTag.id, record.componentTag)
              }
            }}
          />

          <ListItemDeleteButton
            onClick={() => openDeleteModal([record.id], record)}
          />
        </Space>
      ),
    },
  ]

  const { data, isLoading } = useGetComponentsQuery()
  const components = data?.getComponents

  if (isLoading) {
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
