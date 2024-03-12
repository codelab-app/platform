import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import { getElementService } from '@codelab/frontend/abstract/application'
import { isAtom } from '@codelab/frontend/abstract/domain'
import type { IAtomType } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import { atomFactory } from '../atoms'
import { RenderOutput } from '../utils'
import { BaseRenderPipe } from './render-pipe.base'

@model('@codelab/AtomRenderPipe')
export class AtomRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(runtimeElement: IRuntimeElementModel): IRenderOutput {
    const element = runtimeElement.element.current

    if (!isAtom(element.renderType.current)) {
      if (this.renderer.debugMode) {
        console.info('AtomRenderPipe: No atom found', { element: element.name })
      }

      return this.next.render(runtimeElement)
    }

    const atomRenderType = element.renderType.current

    const atomType = (atomRenderType.externalSourceType ??
      atomRenderType.type) as IAtomType

    const [ReactComponent, newProps] = atomFactory({
      atom: atomRenderType,
      node: element,
      props: runtimeElement.runtimeProps.evaluatedProps,
    })

    if (!ReactComponent && !atomRenderType.externalSourceType) {
      console.warn(
        `AtomRenderPipe: No RootComponent found for atom type ${atomType}`,
      )

      return this.next.render(runtimeElement)
    }

    if (this.renderer.debugMode) {
      console.info(`AtomRenderPipe: Rendering atom ${atomType}`, {
        element: element.name,
      })
    }

    return RenderOutput.withAtom({
      atomType,
      props: {
        ...newProps,
        /**
         * This is rendered to style with css prop and styled-components
         */
        css: this.elementService.styleStringWithBreakpoints(element),
      },
      runtimeElement,
    })
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }
}
