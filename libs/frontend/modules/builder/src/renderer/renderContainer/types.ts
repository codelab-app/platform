import { IElement, PropsData } from '@codelab/shared/abstract/core'
import { RenderContext } from '../pipes'

export type RenderContainerProps = {
  root: IElement
  props: PropsData
  context?: RenderContext
}
