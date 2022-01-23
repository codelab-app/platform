import { ApartmentOutlined } from '@ant-design/icons'
import { IElement } from '@codelab/frontend/abstract/core'
import { PageType } from '@codelab/frontend/abstract/types'
import { useTagDispatch } from '@codelab/frontend/modules/tag'
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
import { useElementDispatch } from '../../../hooks'

export const GetComponentsTable = () => {
  const router = useRouter()
  const { openUpdateModal } = useTagDispatch() // We use delete element modal, because all we can change about it here is the tag's properties
  const { openDeleteModal } = useElementDispatch() // We use delete element modal, because components are essentially elements

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
            icon={<ApartmentOutlined />}
            onClick={() =>
              router.push({
                pathname: PageType.ComponentDetail,
                query: { componentId: record.id },
              })
            }
          />

          <ListItemEditButton
            onClick={() => {
              if (record.componentTag) {
                openUpdateModal({
                  updateId: record.componentTag.id,
                  entity: record.componentTag,
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
      columns={columns}
      dataSource={components}
      pagination={{ position: ['bottomCenter'] }}
      rowKey={(component) => component.id}
    />
  )
}
