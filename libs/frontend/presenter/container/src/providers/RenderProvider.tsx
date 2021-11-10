import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { IElement, RenderNode } from '@codelab/frontend/abstract/core'
import { IProps, PropsByElementId, TypeId } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import React, { useContext } from 'react'

export type RenderOutput = React.ReactNode

export interface RenderContext {
  /** The rendered tree */
  tree: ElementTree

  /** Extra props passed to all element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: IProps

  /** Extra props keyed by element id, they override every other prop */
  extraElementProps?: PropsByElementId

  /**
   * A reference to the renderFactory which allows any custom component to render a node
   * It's needed in the context, because rendered components can't import it directly, because it will cause a circular dependency
   * */
  renderFactory: (node: RenderNode, context: RenderContext) => RenderOutput

  /**
   * Called after the element is rendered
   */
  onRendered?: (renderedElement: RenderOutput, vertex: IElement) => void

  /** Set to true to log rendering information */
  inspect?: boolean
  typeKindsById: Record<TypeId, TypeKind>
}

// If you need to modify some value, provide a new RenderContextProvider, with new values
// that way its isolated and will effect only children of the targeted element, minimizing side effects
const RenderContext = React.createContext<RenderContext>({
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  tree: null!,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  renderFactory: null!,
  typeKindsById: {},
})

export const RenderProvider = ({
  children,
  context,
}: React.PropsWithChildren<{
  context: RenderContext
}>) => {
  return (
    <RenderContext.Provider value={context}>{children}</RenderContext.Provider>
  )
}

export const useRenderContext = () => {
  const context = useContext(RenderContext)

  if (!context) {
    throw new Error('Render Context not found. Use RenderProvider')
  }

  return context as RenderContext
}
