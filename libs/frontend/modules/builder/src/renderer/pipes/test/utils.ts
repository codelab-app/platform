import { IElement } from '@codelab/shared/abstract/core'
import { RenderContext } from '../types'
import { ResultPipeOutput } from './types'

export const resultPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, unknown>,
): ResultPipeOutput => {
  const { extraElementProps } = context

  return {
    props,
    extraElementProps,
  }
}
