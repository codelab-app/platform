import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import React, { ReactElement, useMemo } from 'react'
import ReactGridLayout, { ReactGridLayoutProps } from 'react-grid-layout'
import { v4 } from 'uuid'

export const GridLayout = ({
  children,
  ...restProps
}: ReactGridLayoutProps) => {
  const rglChildren = useMemo(() => {
    return React.Children.map(children, (child) => {
      if (!child) {
        return null
      }

      const key = React.isValidElement(child)
        ? (child as ReactElement).key
        : v4()

      return <div key={key}>{child}</div>
    })
  }, [children])

  return (
    <ReactGridLayout
      // default props
      cols={12}
      compactType={null}
      rowHeight={30}
      width={1200}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {rglChildren}
    </ReactGridLayout>
  )
}

GridLayout.displayName = 'GridLayout'
