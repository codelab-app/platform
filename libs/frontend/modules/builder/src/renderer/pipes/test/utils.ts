import { Props } from '@codelab/frontend/abstract/types'
import { IElement } from '@codelab/shared/abstract/core'
import { RenderContext } from '../types'
import { EndPipeOutput } from './types'

export const endPipe = (
  element: IElement,
  context: RenderContext,
  props: Props,
): EndPipeOutput => {
  const { extraElementProps, extraProps } = context

  return {
    props,
    extraElementProps,
    extraProps,
  }
}
