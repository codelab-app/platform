import { Renderer } from '@codelab/alpha/core/renderer'
import {
  NodeReactI,
  NodeType,
  nodeTypeLiterals,
} from '@codelab/alpha/shared/interface/node'
import { PropType } from '@codelab/alpha/shared/interface/props'

const deleteButton: NodeReactI = {
  type: NodeType.React_Button,
  props: {
    type: 'danger',
    onClick: {
      __type: [PropType.Eval],
      value: 'return () => this.handleDelete(this.record.id)',
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
    type: 'warning',
    onClick: {
      __type: [PropType.Eval],
      value: 'return () => this.handleEdit(this.record.id)',
    },
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

const parentTag: NodeReactI = {
  type: NodeType.React_Tag,
  props: {
    color: {
      __type: [PropType.Eval],
      value: 'return this.record.parent? "geekblue" : "white"',
    },
    onClick: {
      __type: [PropType.Eval],
      value: 'return () => this.selectNode(this.record.parent)',
    },
  },
  children: [
    {
      type: NodeType.React_Text,
      props: {
        value: {
          __type: [PropType.Eval],
          value: 'return this.record.parent ?? ""',
        },
      },
    },
  ],
}

const propsTable: NodeReactI = {
  type: NodeType.React_Table,
  props: {
    showHeader: false,
    pagination: false,
    locale: { emptyText: ' ' },
    dataSource: {
      __type: [PropType.Eval],
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
}

const childrenTags: NodeReactI = {
  type: NodeType.React_Mapper,
  props: {
    selectNode: { __type: [PropType.Eval], value: 'return this.selectNode' },
    dataSource: {
      __type: [PropType.Eval],
      value: 'return this.record.children',
    },
    render: {
      type: NodeType.React_Tag,
      props: {
        color: 'magenta',
        onClick: {
          __type: [PropType.Eval],
          value: 'return () => this.selectNode(this.item.id)',
        },
      },
      children: [
        {
          type: NodeType.React_Text,
          props: {
            value: {
              __type: [PropType.Eval],
              value: 'return this.item.id',
            },
          },
        },
      ],
    },
  },
}

const filters = nodeTypeLiterals.map((type) => {
  return { text: type, value: type }
})

const onTypeFilter = (value: any, record: any) => record.type === value

export const tableData: NodeReactI = {
  type: NodeType.React_Table,
  props: {
    handleEdit: {
      __type: [PropType.Eval],
      value: 'return this.handleedit',
    },
    handleDelete: {
      __type: [PropType.Eval],
      value: 'return this.handledelete',
    },
    selectNode: { __type: [PropType.Eval], value: 'return this.selectnode' },
    dataSource: {
      __type: [PropType.Eval],
      value: 'return this.data',
    },
    columns: [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
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
        render: propsTable,
      },
      {
        title: 'Parent',
        dataIndex: 'parent',
        key: 'parent',
        render: parentTag,
      },
      {
        title: 'Children',
        dataIndex: 'children',
        key: 'children',
        render: childrenTags,
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

export type TableProps = {
  data: any
  selectnode: Function
  handleedit: Function
  handledelete: Function
}

export const Table = Renderer.components<TableProps>(tableData)
