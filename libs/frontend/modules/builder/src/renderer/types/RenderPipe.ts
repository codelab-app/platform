import { IElement } from '@codelab/frontend/abstract/core'
import {
  RenderContext,
  RenderOutput,
} from '@codelab/frontend/presenter/container'

export type RenderPipe = (
  element: IElement,
  context: RenderContext,
  props: Record<string, any>,
) => RenderOutput

export type RenderPipeFactory = (next: RenderPipe) => RenderPipe
