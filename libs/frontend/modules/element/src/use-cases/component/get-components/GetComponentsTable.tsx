import { ApartmentOutlined } from '@ant-design/icons'
import { IElement } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/model/state/router'
import {
  ListItemButton,
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space, Spin, Table, TableColumnProps } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import tw from 'twin.macro'
import { useGetComponentsQuery } from '../../../graphql/component.endpoints.graphql.gen'
import { useComponentDispatch } from '../../../hooks/useComponentDispatch'

export const GetComponentsTable = () => {
  const router = useRouter()
  const { openUpdateModal, openDeleteModal } = useComponentDispatch()

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
                openUpdateModal({
                  updateId: record.id,
                  entity: record,
                })
              }
            }}
          />

          <ListItemDeleteButton
            onClick={() =>
              openDeleteModal({
                deleteIds: [record.id],
                entity: record as any,
              })
            }
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
