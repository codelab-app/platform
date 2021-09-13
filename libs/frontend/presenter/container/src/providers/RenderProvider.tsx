import { ElementTree } from '@codelab/shared/core'
import React, { useContext } from 'react'

type ExtractElementType<TTree> = TTree extends ElementTree<
  infer TElement,
  any,
  any
>
  ? TElement
  : never

export type RenderOutput = React.ReactNode

type ExtractComponentType<TTree> = TTree extends ElementTree<
  any,
  infer TComponent,
  any
>
  ? TComponent
  : never

export interface RenderContext<
  TTree extends ElementTree<any, any, any> = ElementTree,
> {
  /** The rendered tree */
  tree: TTree

  /** Extra props passed to all element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: Record<string, any>

  /** Extra props by element id, they override every other prop */
  extraElementProps?: Record<string, Record<string, any>>

  /**
   * A reference to the renderFactory which allows any custom component to render a node
   * It's needed in the context, because rendered components can't import it directly, because it will cause a circular dependency
   * */
  renderFactory: (
    node: ExtractComponentType<TTree> | ExtractElementType<TTree>,
    context: RenderContext<TTree>,
  ) => RenderOutput

  /**
   * Called after the element is rendered
   */
  onRendered?: (
    renderedElement: RenderOutput,
    vertex: ExtractElementType<TTree>,
  ) => void
}

// If you need to modify some value, provide a new RenderContextProvider, with new values
// that way its isolated and will effect only children of the targeted element, minimizing side effects
const RenderContext = React.createContext<RenderContext<any>>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  renderFactory: null!,
})

export const RenderProvider = <TTree extends ElementTree<any, any, any>>({
  children,
  context,
}: React.PropsWithChildren<{
  context: RenderContext<TTree>
}>) => {
  return (
    <RenderContext.Provider value={context}>{children}</RenderContext.Provider>
  )
}

export const useRenderContext = <
  TTree extends ElementTree<any, any, any>,
>() => {
  const context = useContext(RenderContext)

  if (!context) {
    throw new Error('Render Context not found. Use RenderProvider')
  }

  return context as RenderContext<TTree>
}
