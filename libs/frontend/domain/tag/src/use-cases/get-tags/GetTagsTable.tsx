import type { ITagService } from '@codelab/frontend/abstract/core'
import {
  ListItemDeleteButton,
  ListItemEditButton,
} from '@codelab/frontend/view/components'
import type { TableColumnProps } from 'antd'
import { Space, Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { tagRef } from '../../store'

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
  tagService: ITagService
}

export const GetTagsTable = observer<GetTagsTableProps>(
  ({ loading, tagService }) => {
    const dataSource: Array<TagRecord> = tagService.tagsList.map((tag) => ({
      id: tag.id,
      key: tag.id,
      name: tag.name,
    }))

    const columns: Array<TableColumnProps<TagRecord>> = [
      {
        dataIndex: 'name',
        key: 'name',
        title: 'Name',
      },
      {
        key: 'action',
        render: (text, tag) => (
          <Space size="middle">
            <ListItemEditButton
              onClick={() => {
                tagService.updateModal.open(tagRef(tag.id))
              }}
            />
            <ListItemDeleteButton
              onClick={() => tagService.deleteManyModal.open([tagRef(tag.id)])}
            />
          </Space>
        ),
        title: 'Action',
        width: 100,
      },
    ]

    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        scroll={{ y: '80vh' }}
      />
    )
  },
)
