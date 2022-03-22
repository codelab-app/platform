import { ElementModel } from '@codelab/frontend/modules/element'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../RenderOutput'

export interface IRenderPipeInput {
  next: IRenderPipe
}

export interface IRenderPipe {
  render(
    element: ElementModel,
    props: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>>
}
