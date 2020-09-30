import { Table as AntTable } from 'antd'
import { TableProps as AntTableProps } from 'antd/lib/table'
import React from 'react'
// eslint-disable-next-line import/no-cycle
import { Renderer } from '@codelab/core/renderer'

export type TableProps<T extends object = any> = AntTableProps<T>

interface CellProps<T = any> {
  // title: React.ReactNode
  // editable: boolean
  index: number
  record: T
  // children: React.ReactNode
  // dataIndex: string
  // handleSave: (record: T) => void
}

export namespace CodelabTable {
  export const Default = <T extends object = any>(props: TableProps<T>) => {
    const { dataSource, columns, ...restProps } = props

    // console.log(restProps)

    const mappedColumns = columns?.map(({ render, ...column }: any) => {
      if (render) {
        return {
          ...column,
          render: (text: string, record: any, index: number) => {
            const Cell = Renderer.components<CellProps>(render)

            return <Cell {...restProps} record={record} index={index} />
          },
        }
      }

      return {
        ...column,
      }
    })

    return (
      <AntTable
        dataSource={dataSource}
        columns={mappedColumns}
        {...restProps}
      />
    )
  }
}
