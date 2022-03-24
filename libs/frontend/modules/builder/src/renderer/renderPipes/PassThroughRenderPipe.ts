import { Element } from '@codelab/frontend/modules/element'
import { AtomType, PropsData } from '@codelab/shared/abstract/core'
import { getSnapshot, Model, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderContext } from '../renderContext'

/**
 * Render pipe that renders whatever you give it - useful for unit testing
 */
@model('@codelab/PassThroughRenderPipe')
export class PassThroughRenderPipe extends Model({}) implements IRenderPipe {
  render(element: Element, props: PropsData): ArrayOrSingle<RenderOutput> {
    const renderer = getRenderContext(this)

    if (renderer.debugMode) {
      console.log(`PassThroughRenderPipe: rendering input`, {
        element: getSnapshot(element),
        props,
      })
    }

    return RenderOutput.withAtom({
      props: props,
      atomType: element.atom?.current.type || AtomType.ReactFragment,
      elementId: element.id,
    })
  }
}
