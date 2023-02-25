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
              onClick={() => {
                tagService.updateModal.open(tagRef(tag.id))
              }}
            />
            <ListItemDeleteButton
              onClick={() => tagService.deleteManyModal.open([tagRef(tag.id)])}
            />
          </Space>
        ),
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
