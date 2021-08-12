import React, { useContext } from 'react'
import { ElementTree, RenderNode } from '../interfaces'

export type PropMapperFunction = (
  props: Record<string, any>,
  node: RenderNode,
) => Record<string, any>

export interface RenderContext {
  /** The rendered tree */
  tree: ElementTree

  /** Extra props passed to the element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: Record<string, any>

  /** Called inside the rendered components, after its children */
  postChildrenRenderHook?: (node: RenderNode) => React.ReactNode

  /** Use this to modify the props of the node instance.
   * @param props - the node instance props, does not include the common props
   * @return the modified props you want to get passed to the rendered react component
   */
  nodePropsMappers?: ReadonlyArray<PropMapperFunction>

  /**
   * A reference to the renderFactory which allows any custom component to render a node
   * It's needed in the context, because rendered components can't import it directly, because it will cause a circular dependency
   * */
  renderFactory: (node: RenderNode | undefined | null) => any | null
}

// If you need to modify some value, provide a new RenderContextProvider, with new values
// that way its isolated and will effect only children of the targeted element, minimizing side effects
const RenderContext = React.createContext<RenderContext>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: null!,
  postChildrenRenderHook: undefined,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  renderFactory: null!,
})

export const RenderProvider = ({
  children,
  context,
}: React.PropsWithChildren<{ context: RenderContext }>) => {
  return (
    <RenderContext.Provider value={context}>{children}</RenderContext.Provider>
  )
}

export const useRenderContext = () => {
  const context = useContext(RenderContext)

  if (!context) {
    throw new Error('Render Context not found. Use RenderProvider')
  }

  return context
}
