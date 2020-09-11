import { ReactNodeI } from '@codelab/shared/interface/node'
import { Button } from '../button'
import { Text } from '../text'
import { Table } from './Table.types'

const deleteButton: ReactNodeI<
  | Table.Props
  | Table.ColumnProps
  | Table.ColumnGroupProps
  | Text.Props
  | Button.Props
> = {
  type: 'Button',
  nodeType: 'React',
  props: {
    type: 'danger',
    onClick: {
      eval: true,
      value: 'return () => console.log(this.props.record.value.name)',
    },
  },
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value: 'Delete',
      },
    },
  ],
}

const editButton: ReactNodeI = {
  type: 'Button',
  nodeType: 'React',
  props: {
    type: 'warning',
  },
  children: [
    {
      type: 'Text',
      nodeType: 'React',
      props: {
        value: 'Edit',
      },
    },
  ],
}

export const tableData: ReactNodeI = {
  type: 'Table',
  nodeType: 'React',
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
          type: 'Space',
          nodeType: 'React',
          children: [editButton, deleteButton],
        },
      },
    ],
  },
}
