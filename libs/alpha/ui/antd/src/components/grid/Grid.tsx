import { Node, NodeHelpers, UserComponent } from '@craftjs/core'
import { Col as AntdCol, Row as AntdRow, ColProps, RowProps } from 'antd'
import React from 'react'

export namespace Grid {
  export const Row: UserComponent<RowProps> = React.forwardRef(
    ({ children, ...props }, ref: any) => {
      return (
        <AntdRow {...props} ref={ref}>
          {children}
        </AntdRow>
      )
    },
  )

  /* export const Row: UserComponent<RowProps> = ({ children, ...props }) => {
     *     const {
     *         connectors: { connect, drag },
     *     } = useNode()

     *     return (
     *         <AntdRow {...props} ref={(ref) => connect(drag(ref))}>
     *             {children}
     *         </AntdRow>
     *     )
     * } */
  Row.craft = {
    rules: {
      canDrop: (targetNode: Node, currentNode: Node, helpers: NodeHelpers) => {
        console.log('=======ROW canDrop ============================')
        console.log(targetNode)

        return true
      },
    },
  }
  export const Col: UserComponent<ColProps> = React.forwardRef(
    ({ children, ...props }, ref: any) => {
      return (
        <AntdCol {...props} ref={ref}>
          {children}
        </AntdCol>
      )
    },
  )
  Col.craft = {
    rules: {
      canDrop: (targetNode: Node, currentNode: Node, helpers: NodeHelpers) => {
        console.log('=======COL canDrop ============================')
        console.log(targetNode)

        return true
      },
    },
  }

  /* export const Col: UserComponent<ColProps> = ({ children, ...props }) => {
     *   const {
     *     connectors: { connect, drag },
     *   } = useNode()

     *   return (
     *     <AntdCol
     *       {...props}
     *       ref={(ref: any) => {
     *         connect(drag(ref))
     *       }}
     *     >
     *       {children}
     *     </AntdCol>
     *   )
     * } */
}
