import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import { Space, Table, TableColumnProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { WithTagService } from '../../store'
import { tagRef } from '../../store/tag.model'

export interface TagRecord {
  id: string
  name: string
}

export interface TagRecord {
  id: string
  name: string
}

interface GetTagsTableProps {
  loading: boolean
}

export const GetTagsTable = observer<WithTagService & GetTagsTableProps>(
  ({ tagService, loading }) => {
    const dataSource: Array<TagRecord> = tagService.tagsList.map((tag) => ({
      key: tag.id,
      id: tag.id,
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
        render: (text, tag) => (
          <Space size="middle">
            <ListItemEditButton
              onClick={() => tagService.updateModal.open(tagRef(tag.id))}
            />
            <ListItemDeleteButton
              onClick={() => tagService.deleteModal.open([tagRef(tag.id)])}
            />
          </Space>
        ),
      },
    ]

    return <Table columns={columns} dataSource={dataSource} loading={loading} />
  },
)
