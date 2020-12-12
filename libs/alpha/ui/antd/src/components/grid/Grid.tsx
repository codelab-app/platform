import React, { PropsWithChildren } from 'react'
import GridLayout, {
  ReactGridLayoutProps,
  Responsive as ResponsiveGrid,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(ResponsiveGrid)

type RGLProps = ReactGridLayoutProps
type RGLResponsiveProps = ResponsiveProps

export namespace Grid {
  export const Default: React.FC<PropsWithChildren<RGLProps>> = ({
    children,
    ...props
  }) => {
    return <GridLayout {...props}>{children}</GridLayout>
  }

  export const Responsive: React.FC<PropsWithChildren<RGLResponsiveProps>> = ({
    children,
    ...props
  }) => {
    return <ResponsiveGridLayout {...props}>{children}</ResponsiveGridLayout>
  }
}
