import type {
  IEnumType,
  IEnumTypeRecord,
} from '@codelab/frontend/abstract/core'
import type { ColumnProps } from 'antd/lib/table'
import Table from 'antd/lib/table'
import { observer } from 'mobx-react-lite'
import React from 'react'

interface EnumTypeTableProps {
  enumType: IEnumType
}

export const EnumTypeTable = observer<EnumTypeTableProps>(({ enumType }) => {
  const columns: Array<ColumnProps<IEnumTypeRecord>> = [
    {
      dataIndex: 'key',
      key: 'key',
      title: 'Key',
    },
    {
      dataIndex: 'value',
      key: 'value',
      title: 'Value',
    },
  ]

  const dataSource = enumType.allowedValues.map((value) => ({
    id: value.id,
    key: value.key,
    value: value.value,
  }))

  return <Table columns={columns} dataSource={dataSource} pagination={false} />
})
