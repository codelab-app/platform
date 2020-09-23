import { Button } from '../button'
import { Text } from '../text'
import { Table } from './Table.types'
import { NodeReactI } from '@codelab/shared/interface/node'

const deleteButton: NodeReactI<
  | Table.Props
  | Table.ColumnProps
  | Table.ColumnGroupProps
  | Text.Props
  | Button.Props
> = {
  type: 'React.Button',
  props: {
    type: 'danger',
    onClick: {
      __type: 'eval',
      value: 'return () => console.log(this.props.record.name)',
    },
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: 'Delete',
      },
    },
  ],
}

const editButton: NodeReactI = {
  type: 'React.Button',
  props: {
    type: 'default',
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: 'Edit',
      },
    },
  ],
}

export const tableData: NodeReactI = {
  type: 'React.Table',
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
          type: 'React.Space',
          children: [editButton, deleteButton],
        },
      },
    ],
  },
}
