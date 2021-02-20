import { UserComponent } from '@craftjs/core'
import { VertexType } from '@prisma/client'
import React from 'react'
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

// const isReactFragment = (children: any) => {
//   if (children.type) {
//     return children.type === React.Fragment
//   }

//   return children === React.Fragment
// }

export namespace RGL {
  export const Container: UserComponent<RGLProps> = ({
    children,
    ...props
  }) => {
    console.log(props, children)

    return <GridLayout {...props}>{children}</GridLayout>
  }

  Container.craft = {
    name: VertexType.React_RGL_Container,
  }

  const isReactFragment = (children: any) => {
    if (children?.type) {
      return children?.type === React.Fragment
    }

    return children === React.Fragment
  }

  export const ResponsiveContainer: UserComponent<RGLResponsiveProps> = ({
    children,
    ...props
  }) => {
    console.log(props, children)

    return (
      <ResponsiveGridLayout {...props}>
        {children}
        {/* Rendering the children and not the fragment, if it is one, will at least give us the children inside the grid if we use craft.js */}
        {/* {isReactFragment(children) && (children as any)?.props?.children
          ? (children as any).props.children
          : children} */}
      </ResponsiveGridLayout>
    )
  }

  ResponsiveContainer.craft = {
    name: VertexType.React_RGL_ResponsiveContainer,
  }

  export const Item: UserComponent<RGLItemProps> = ({
    children,
    'data-grid': dataGrid,
    ...props
  }) => {
    console.log(props, children)

    return (
      <div {...props} data-grid={JSON.stringify(dataGrid)}>
        {children}
      </div>
    )
  }

  Item.craft = { name: VertexType.React_RGL_Item }
}
