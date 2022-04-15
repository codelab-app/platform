import { RightCircleOutlined } from '@ant-design/icons'
import { PageType } from '@codelab/frontend/abstract/types'
import {
  ListItemDeleteButton,
  ListItemEditButton,
  useColumnSearchProps,
} from '@codelab/frontend/view/components'
import { headerCellProps } from '@codelab/frontend/view/style'
import { Space, Table } from 'antd'
import { ColumnsType, TableRowSelection } from 'antd/lib/table/interface'
import { arraySet } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'
import { useGetAllTypesQuery } from '../../../hooks'
import { typeRef, WithTypeService } from '../../../store'

interface CellData {
  name: string
  typeKind: TypeKind
  id: string
}

export const GetTypesTable = observer<WithTypeService>(({ typeService }) => {
  const { data, isLoading } = useGetAllTypesQuery(undefined, typeService)

  const columns: ColumnsType<CellData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('name'),
    },
    {
      title: 'Kind',
      dataIndex: 'typeKind',
      key: 'typeKind',
      onHeaderCell: headerCellProps,
      ...useColumnSearchProps('typeKind'),
    },
    {
      title: 'Action',
      key: 'action',
      onHeaderCell: headerCellProps,
      width: 100,
      render: (text, record) => (
        <Space size="middle">
          {record.typeKind === 'InterfaceType' ? (
            <Link
              href={PageType.InterfaceDetail.replace(
                '[interfaceId]',
                record.id,
              )}
            >
              <RightCircleOutlined />
            </Link>
          ) : (
            <ListItemEditButton
              onClick={() => {
                typeService.updateModal.open(typeRef(record.id))
              }}
            />
          )}

          <ListItemDeleteButton
            onClick={() => typeService.deleteModal.open(typeRef(record.id))}
          />
        </Space>
      ),
    },
  ]

  const rowSelection: TableRowSelection<CellData> = {
    type: 'checkbox',
    onChange: (_: Array<React.Key>, selectedRows: Array<CellData>) => {
      typeService.setSelectedIds(arraySet(selectedRows.map(({ id }) => id)))
    },
  }

  // Manually build the data for the table because Table is not reactive and
  // this way we ensure it will get re-rendered properly on updates
  const dataSource: Array<CellData> =
    data?.map((t) => ({
      id: t.id,
      name: t.name,
      typeKind: t.typeKind,
    })) ?? []

  return (
    <Table<CellData>
      columns={columns}
      dataSource={dataSource}
      loading={isLoading}
      pagination={{ position: ['bottomCenter'] }}
      rowKey={(type) => type.id}
      rowSelection={rowSelection}
      size="small"
    />
  )
})
