import { IPreRender, IPreRenderService } from '@codelab/frontend/abstract/core'
import { Table } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { usePreRenderTable } from './usePreRenderTable'

interface GetPreRendersTableProps {
  preRenderService: IPreRenderService
  preRenders: Array<IPreRender>
}

export const GetPreRendersTable = observer<GetPreRendersTableProps>(
  ({ preRenderService, preRenders }) => {
    const { columns, pagination } = usePreRenderTable(preRenderService)

    const data = preRenders.map((x) => ({
      name: x.name,
      type: x.type,
      page: x.page,
      code: x.code,
      id: x.id,
    }))

    return (
      <Table
        columns={columns}
        dataSource={data}
        pagination={pagination}
        rowKey={(preRender) => preRender.id}
      />
    )
  },
)
