import { Element } from '@codelab/frontend/modules/element'
import { AtomType, IPropData } from '@codelab/shared/abstract/core'
import { Model, model } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderContext } from '../renderServiceContext'

/**
 * Render pipe that renders whatever you give it - useful for unit testing
 */
@model('codelab/PassThroughRenderPipe')
export class PassThroughRenderPipe extends Model({}) implements IRenderPipe {
  render(element: Element, props: IPropData): ArrayOrSingle<RenderOutput> {
    const renderer = getRenderContext(this)

    if (renderer.debugMode) {
      console.log(`PassThroughRenderPipe: rendering input`, {
        element,
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
