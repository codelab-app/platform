import React, { PropsWithChildren } from 'react'
import GridLayout, {
  ReactGridLayoutProps,
  Responsive as ResponsiveGrid,
  ResponsiveProps,
  WidthProvider,
} from 'react-grid-layout'
import { RGLItemProps } from './RGL.input'

const ResponsiveGridLayout = WidthProvider(ResponsiveGrid)

type RGLProps = ReactGridLayoutProps
type RGLResponsiveProps = ResponsiveProps

const isReactFragment = (children: any) => {
  if (children.type) {
    return children.type === React.Fragment
  }

  return children === React.Fragment
}

export namespace RGL {
  export const Container: React.FC<PropsWithChildren<RGLProps>> = ({
    children,
    ...props
  }) => {
    return <GridLayout {...props}>{children}</GridLayout>
  }

  Container.displayName = 'RGLContainer'

  export const ResponsiveContainer: React.FC<
    PropsWithChildren<RGLResponsiveProps>
  > = ({ children, ...props }) => {
    return (
      <ResponsiveGridLayout {...props}>
        {/* Rendering the children and not the fragment, if it is one, will at least give us the children inside the grid if we use craft.js */}
        {isReactFragment(children) && (children as any)?.props?.children
          ? (children as any).props.children
          : children}
      </ResponsiveGridLayout>
    )
  }

  ResponsiveContainer.displayName = 'RGLResponsiveContainer'

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

  Item.displayName = 'RGLItem'
}
