import { Renderer } from '@codelab/core/renderer'
import { NodeReactI, nodeTypeLiterals } from '@codelab/shared/interface/node'

const propsTable: NodeReactI = {
  type: 'React.Table',
  props: {
    showHeader: false,
    pagination: false,
    locale: { emptyText: ' ' },
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
}

const filters = nodeTypeLiterals.map((type) => {
  return { text: type, value: type }
})

const onTypeFilter = (value: any, record: any) => record.type === value

export const tableData: NodeReactI = {
  type: 'React.Table',
  props: {
    // handleEdit: {
    //   __type: ['Eval'],
    //   value: 'return this.handleedit',
    // },
    // handleDelete: {
    //   __type: ['Eval'],
    //   value: 'return this.handledelete',
    // },
    // selectNode: { __type: ['Eval'], value: 'return this.selectnode' },
    dataSource: {
      __type: ['Eval'],
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
      // {
      //   title: 'Parent',
      //   dataIndex: 'parent',
      //   key: 'parent',
      //   render: TagParent,
      // },
      // {
      //   title: 'Children',
      //   dataIndex: 'children',
      //   key: 'children',
      //   // render: tagChildren,
      //   render: TagChildren,
      // },
      // {
      //   title: 'Action',
      //   dataIndex: 'action',
      //   key: 'action',
      //   render: {
      //     type: 'React.Space',
      //     children: [buttonEdit, buttonDelete],
      //     // children: [<ButtonEdit />, <ButtonDelete />],
      //   },
      // },
    ],
  },
}

export type TableProps = {
  data: any
}

export const Table = Renderer.components<TableProps>(tableData)
