import { IElement } from '@codelab/shared/abstract/core'
import { RenderContext } from '../types'
import { EndPipeOutput } from './types'

export const endPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
): EndPipeOutput => {
  const { extraElementProps } = context

  return {
    props,
    extraElementProps,
  }
}
