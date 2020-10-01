import { Renderer } from '@codelab/core/renderer'
import type { NodeReactI } from '@codelab/shared/interface/node'
import { nodeTypeLiterals } from '@codelab/shared/interface/node'

const deleteButton: NodeReactI = {
  type: 'React.Button',
  props: {
    type: 'danger',
    onClick: {
      eval: true,
      value:
        'return () => this.props.handledelete.value.value(this.props.record.value._id)',
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
      eval: true,
      value:
        'return () => this.props.handleedit.value.value(this.props.record.value._id)',
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
      eval: true,
      value:
        'return () => this.props.selectnode.value.value(this.props.record.value.parent)',
    },
  },
  children: [
    {
      type: 'React.Text',
      props: {
        value: { eval: true, value: 'return this.props.record.value.parent' },
      },
    },
  ],
}

const filters = nodeTypeLiterals.map((type) => {
  return { text: type, value: type }
})

const onTypeFilter = (value, record) => record.type === value

export const tableData: NodeReactI = {
  type: 'React.Table',
  props: {
    dataSource: {
      eval: true,
      value: 'return this.props.data.value',
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
              eval: true,
              value: 'return this.props.record.value.props',
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

export interface TableProps {
  data: any
  selectnode: Function
  handleedit: Function
  handledelete: Function
}

export const Table = Renderer.components<TableProps>(tableData)
