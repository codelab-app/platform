import { ElementModel } from '@codelab/frontend/modules/element'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Model, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../RenderOutput'

/**
 * Fallback render pipe, returns null
 */
@model('@codelab/NullRenderPipe')
export class NullRenderPipe extends Model({}) implements IRenderPipe {
  render(
    element: ElementModel,
    props: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>> {
    return null
  }
}
