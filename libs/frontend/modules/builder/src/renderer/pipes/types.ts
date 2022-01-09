import { IElement } from '@codelab/frontend/abstract/core'
import {
  IHook,
  PropsData,
  PropsDataByElementId,
} from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'

export type RenderOutput = React.ReactNode

export interface RendererProps {
  tree: ElementTree
  isComponentRenderer?: boolean
  context?: Omit<RenderContext, 'tree' | 'render'>
}

export interface RenderContext {
  /** The rendered tree */
  tree: ElementTree

  /** Extra props passed to all element. They override the common props, but props from the node instance override the extraProps */
  extraProps?: PropsData

  /** Extra props keyed by element id, they override every other prop */
  extraElementProps?: PropsDataByElementId

  render: RenderTypes

  getHooksResponse?: (hooks: Array<IHook>, props: PropsData) => PropsData
  /**
   * Called after the element tree is re-rendered
   */
  onRendered?: (renderedProps: PropsData) => void

  /** Set to true to log rendering information */
  inspect?: boolean
}

export type RenderTypes = (
  element: IElement,
  context: RenderContext,
  props: PropsData,
) => RenderOutput

export type RenderPipeFactory = (next: RenderTypes) => RenderTypes
