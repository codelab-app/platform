import { Button } from '../button'
import { Text } from '../text'
import { Table } from './Table.types'
import { NodeReactDtoI } from '@codelab/shared/interface/node'

const deleteButton: NodeReactDtoI<
  | Table.Props
  | Table.ColumnProps
  | Table.ColumnGroupProps
  | Text.Props
  | Button.Props
> = {
  type: 'React.Button',
  props: {
    type: 'React.danger',
    onClick: {
      eval: true,
      value: 'return () => console.log(this.props.record.value.name)',
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

const editButton: NodeReactDtoI = {
  type: 'React.Button',
  props: {
    type: 'React.warning',
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

export const tableData: NodeReactDtoI = {
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
