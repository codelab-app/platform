import { TypeKind } from '@codelab/frontend/abstract/codegen'
import { IElement } from '@codelab/frontend/abstract/core'
import { IHook, TypeId } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import {
  PropsPerElementIdPayload,
  RenderPipelineProps,
  RenderPipelinePropsByElementId,
} from '../../store'

export type RenderOutput = React.ReactNode

export interface RendererProps {
  tree: ElementTree
  isComponentRenderer?: boolean
  parentContext?: Omit<RenderContext, 'tree'>
}

export interface RenderContext {
  /** The rendered tree */
  tree: ElementTree

  /** Extra props passed to all element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: RenderPipelineProps

  /** Extra props keyed by element id, they override every other prop */
  extraElementProps?: RenderPipelinePropsByElementId

  getHooksResponse?: (
    hooks: Array<IHook>,
    props: RenderPipelineProps,
  ) => RenderPipelineProps
  /**
   * Called after the element tree is re-rendered
   */
  onRendered?: (renderedElementsById: PropsPerElementIdPayload) => void

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
