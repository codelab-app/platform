import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'
import { nodeTypeLiterals } from '@codelab/shared/interface/node'

const deleteButton: NodeReactI = {
  type: 'React.Button',
  props: {
    type: 'danger',
    onClick: {
      __type: ['Eval'],
      value:
        'return () => this.handledelete.value.value(this.record.value._id)',
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
    type: 'React.warning',
    onClick: {
      __type: ['Eval'],
      value: 'return () => this.handleedit.value(this.record._id)',
    },
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

const tagId: NodeReactI = {
  type: 'React.Tag',
  props: {
    color: 'geekblue',
    onClick: {
      __type: ['Eval'],
      value: 'return () => this.selectnode.value.value(this.record.parent)',
    },
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: { __type: ['Eval'], value: 'return this.record.parent' },
      },
    },
  ],
}

const filters = nodeTypeLiterals.map((type) => {
  return { text: type, value: type }
})

const onTypeFilter = (value: any, record: any) => record.type === value

export const tableData: NodeReactI = {
  type: 'React.Table',
  props: {
    dataSource: {
      __type: ['Eval'],
      value: 'return this.data',
    },
    columns: [
      {
        title: 'Id',
        dataIndex: '_id',
        key: '_id',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters,
        onFilter: onTypeFilter,
      },
      {
        title: 'Props',
        dataIndex: 'props',
        key: 'props',
        render: {
          type: 'React.Table',
          props: {
            showHeader: false,
            pagination: false,
            dataSource: {
              __type: ['Eval'],
              value: 'return this.record.props',
            },
            columns: [
              { title: 'Key', dataIndex: 'key', key: 'key', width: '50%' },
              {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                width: '50%',
              },
            ],
          },
        },
      },
      {
        title: 'Parent',
        dataIndex: 'parent',
        key: 'parent',
        render: tagId,
      },
      {
        title: 'Children',
        dataIndex: 'children',
        key: 'children',
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

export type TableProps = {
  data: any
  selectnode: Function
  handleedit: Function
  handledelete: Function
}

export const Table = Renderer.components<TableProps>(tableData)
