import { Space, Table, TableColumnProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { WithTagService } from '../../store'

export interface TagRecord {
  name: string
}

export const GetTagsTable = observer<WithTagService>(({ tagService }) => {
  const dataSource: Array<TagRecord> = tagService.tagsList.map((tag) => ({
    key: tag.id,
    name: tag.name,
  }))

  const columns: Array<TableColumnProps<TagRecord>> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (text, atom) => <Space size="middle"></Space>,
    },
  ]

  return <Table columns={columns} dataSource={dataSource} />
})
