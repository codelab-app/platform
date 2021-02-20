import { UserComponent } from '@craftjs/core'
import { Col as AntdCol, Row as AntdRow, ColProps, RowProps } from 'antd'
import React from 'react'

export namespace Grid {
  export const Row: UserComponent<RowProps> = ({ children, ...props }) => {
    return <AntdRow {...props}>{children}</AntdRow>
  }
  export const Col: UserComponent<ColProps> = ({ children, ...props }) => {
    return <AntdCol {...props}>{children}</AntdCol>
  }
}
