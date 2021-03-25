import { Table as AntTable } from 'antd'
import { TableProps as AntTableProps } from 'antd/lib/table'
import React from 'react'
import { isReactNode } from '@codelab/alpha/core/node'

export type TableProps<RecordType = any> = AntTableProps<RecordType>

type CellProps<T = any> = {
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

    const mappedColumns = columns?.map(({ render, ...column }: any) => {
      // console.log(render, typeof render, render?.$$typeof)

      // If is React component
      // if (React.isValidElement(render)) {
      // TODO: need better checking for react component here
      if (typeof render === 'function') {
        return {
          ...column,
          render: (text: string, record: any, index: number) => {
            // return <Comp {...restProps} record={record} index={index} />
            return React.createElement(render, {
              ...restProps,
              record,
              index,
            })
          },
        }
      }

      // If is JSON representation of React component
      if (isReactNode(render)) {
        return {
          ...column,
          render: (text: string, record: any, index: number) => {
            // The Renderer introduces all sorts of messy and broken code from @codelab/alpha
            // Need to make this work with frontend renderer
            // const Cell = Renderer.components<CellProps>(render)
            //
            // return <Cell {...restProps} record={record} index={index} />
            throw new Error(
              'Custom node inside table cell is not implemented yet',
            )
          },
        }
      }

      return column
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
