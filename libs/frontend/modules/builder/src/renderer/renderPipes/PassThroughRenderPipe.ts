import { ElementModel } from '@codelab/frontend/modules/element'
import {
  AtomType,
  PropsData,
  PropsDataByElementId,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Model, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../RenderOutput'

/**
 * Render pipe that's useful for unit testing - renders whatever you give it
 */
@model('@codelab/PassThroughRenderPipe')
export class PassThroughRenderPipe extends Model({}) implements IRenderPipe {
  render(
    element: ElementModel,
    props: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>> {
    return {
      props: props,
      descendantPropBindings: extraElementProps,
      atomType: element.atom?.current.type || AtomType.ReactFragment,
      elementId: element.id,
    }
  }
}
