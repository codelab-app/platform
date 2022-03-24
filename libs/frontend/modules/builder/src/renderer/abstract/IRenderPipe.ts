import { Element } from '@codelab/frontend/modules/element'
import { PropsData } from '@codelab/shared/abstract/core'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from './RenderOutput'

export interface IRenderPipeInput {
  next: IRenderPipe
}

export interface IRenderPipe {
  render(element: Element, props: PropsData): ArrayOrSingle<RenderOutput>
}
