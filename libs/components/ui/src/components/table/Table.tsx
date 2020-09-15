import { Table as AntTable } from 'antd'
import { TableProps as AntTableProps } from 'antd/lib/table'
import React from 'react'
// eslint-disable-next-line import/no-cycle
import { TreeDom } from '@codelab/core/renderer'

export type TableProps<T extends object = any> = AntTableProps<T>

export namespace CodelabTable {
  export const Default = <T extends object = any>(props: TableProps<T>) => {
    const { dataSource, columns } = props

    const mappedColumns = columns?.map(({ render, ...column }: any) => {
      if (render) {
        return {
          ...column,
          render: (text: string, record: any, index: number) => {
            const Cell = TreeDom.render(render)

            return <Cell record={record} index={index} />
          },
        }
      }

      return {
        ...column,
      }
    })

    return <AntTable dataSource={dataSource} columns={mappedColumns} />
  }
}
