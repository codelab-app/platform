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
      title: 'Key',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
    },
  ]

  const dataSource = enumType.allowedValues.map((value) => ({
    id: value.id,
    key: value.key,
    value: value.value,
  }))

  return <Table columns={columns} dataSource={dataSource} pagination={false} />
})
