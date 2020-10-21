import { Button } from '../button'
import { Text } from '../text'
import { Table } from './Table.types'
import { NodeReactI, NodeType } from '@codelab/shared/interface/node'

const deleteButton: NodeReactI<
  | Table.Props
  | Table.ColumnProps
  | Table.ColumnGroupProps
  | Text.Props
  | Button.Props
> = {
  type: NodeType.React_Button,
  props: {
    type: 'danger',
    onClick: {
      __type: ['Eval'],
      value: 'return () => console.log(this.record.name)',
    },
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Delete',
      },
    },
  ],
}

const editButton: NodeReactI = {
  type: NodeType.React_Button,
  props: {
    type: 'default',
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: 'Edit',
      },
    },
  ],
}

export const tableData: NodeReactI = {
  type: NodeType.React_Table,
  props: {
    dataSource: [
      {
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ],
    columns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        render: {
          type: NodeType.React_Space,
          children: [editButton, deleteButton],
        },
      },
    ],
  },
}
