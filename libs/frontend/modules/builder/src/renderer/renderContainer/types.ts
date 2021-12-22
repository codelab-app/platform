import { IElement } from '@codelab/shared/abstract/core'
import { RenderPipelineProps } from '../../store'
import { RenderContext } from '../pipes'

export type RenderContainerProps = {
  element: IElement
  context: RenderContext
  props: RenderPipelineProps
  /** Used for inspecting root element */
  isRoot?: boolean

  /** Add string value so that whenever it changes the container will re-render */
  appendToKey?: string
}

export type RenderContainerWithKeyProps = Omit<
  RenderContainerProps,
  'appendToKey'
>
