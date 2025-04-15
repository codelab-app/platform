import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend-abstract-application'

import { isComponent } from '@codelab/frontend-abstract-domain'
import { IAtomType } from '@codelab/shared-abstract-core'
import { ExtendedModel, model, prop } from 'mobx-keystone'

import { RenderOutput } from './render-output'
import { BaseRenderPipe } from './render-pipe.base'

/**
 * Render pipe that renders component container (instance element is represented by fragment)
 */
@model('@codelab/ComponentRenderPipe')
export class ComponentRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const element = runtimeElement.element.current

    if (!isComponent(element.renderType.current)) {
      if (this.renderer.debugMode) {
        console.info('ComponentRenderPipe: No atom found', {
          element: element.name,
        })
      }

      return this.next.render(runtimeElement)
    }

    return RenderOutput.withAtom({
      atomType: IAtomType.ReactFragment,
      props: runtimeElement.runtimeProps.evaluatedProps,
      runtimeElement,
    })
  }
}
