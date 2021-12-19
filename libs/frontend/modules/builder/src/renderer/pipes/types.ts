import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { IElement } from '@codelab/frontend/abstract/core'
import { TypeId } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import {
  RenderPipelineProps,
  RenderPipelinePropsByElementId,
} from '../../store'

export type RenderOutput = React.ReactNode

export interface RenderContext {
  /** The rendered tree */
  tree: ElementTree

  /** Extra props passed to all element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: RenderPipelineProps

  /** Extra props keyed by element id, they override every other prop */
  extraElementProps?: RenderPipelinePropsByElementId

  /**
   * A reference to the render pipeline which allows any custom component to render a node
   * It's needed in the context, because rendered components can't import it directly, because it will cause a circular dependency
   * */
  render: RenderTypes

  /**
   * Called after the element tree is re-rendered
   */
  onRendered?: (renderedElementsById: Record<string, RenderOutput>) => void

  /** Set to true to log rendering information */
  inspect?: boolean
  typeKindsById: Record<TypeId, TypeKind>
}

export type RenderTypes = (
  element: IElement,
  context: RenderContext,
  props: RenderPipelineProps,
) => RenderOutput

export type RenderPipeFactory = (next: RenderTypes) => RenderTypes
