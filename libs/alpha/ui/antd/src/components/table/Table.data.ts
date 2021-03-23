import { PropType } from '../../props/PropType'
import { AtomType, NodeI } from '@codelab/frontend'

const deleteButton: NodeI = {
  type: AtomType.ReactButton,
  props: {
    type: 'danger',
    onClick: {
      __type: [PropType.Eval],
      value: 'return () => console.log(this.record.name)',
    },
  },
  children: [
    {
      type: AtomType.ReactText,
      props: {
        value: 'Delete',
      },
    },
  ],
}

const editButton: NodeI = {
  type: AtomType.ReactButton,
  props: {
    type: 'default',
  },
  children: [
    {
      type: AtomType.ReactText,
      props: {
        value: 'Edit',
      },
    },
  ],
}

export const tableData: NodeI = {
  type: AtomType.ReactTable,
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
          type: AtomType.ReactSpace,
          children: [editButton, deleteButton],
        },
      },
    ],
  },
}
