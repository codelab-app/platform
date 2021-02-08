import React, { PropsWithChildren } from 'react'
import GridLayout, {
  ReactGridLayoutProps,
  Responsive as ResponsiveGrid,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout'
import { RGLItemProps } from './RGL-item.input'

const ResponsiveGridLayout = WidthProvider(ResponsiveGrid)

type RGLProps = ReactGridLayoutProps
type RGLResponsiveProps = ResponsiveProps

export namespace RGL {
  export const Container: React.FC<PropsWithChildren<RGLProps>> = ({
    children,
    ...props
  }) => {
    return <GridLayout {...props}>{children}</GridLayout>
  }

  export const ResponsiveContainer: React.FC<
    PropsWithChildren<RGLResponsiveProps>
  > = ({ children, ...props }) => {
    return <ResponsiveGridLayout {...props}>{children}</ResponsiveGridLayout>
  }

  export const Item: React.FC<RGLItemProps> = ({
    children,
    'data-grid': dataGrid,
    ...props
  }) => {
    return (
      <div {...props} data-grid={JSON.stringify(dataGrid)}>
        {children}
      </div>
    )
  }
}
