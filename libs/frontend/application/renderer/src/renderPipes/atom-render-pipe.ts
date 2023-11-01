import type {
  IRenderOutput,
  IRenderPipe,
  IRuntimeElement,
} from '@codelab/frontend/abstract/application'
import { getElementService } from '@codelab/frontend/abstract/application'
import { type IElementModel, isAtom } from '@codelab/frontend/abstract/domain'
import type { IAtomType, IPropData } from '@codelab/shared/abstract/core'
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
  render(runtimeElement: IRuntimeElement): IRenderOutput {
    const element = runtimeElement.element

    if (!isAtom(element.renderType.current)) {
      if (this.renderer.debugMode) {
        console.info(`AtomRenderPipe: No atom found`, { element: element.name })
      }

      return this.next.render(runtimeElement)
    }

    const atomRenderType = element.renderType.current

    const atomType = (atomRenderType.externalSourceType ??
      atomRenderType.type) as IAtomType

    const [ReactComponent, newProps] = atomFactory({
      atom: atomRenderType,
      node: element,
      props: runtimeElement.props,
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
      element,
      props: {
        ...newProps,
        /**
         * This is rendered to style with css prop and styled-components
         */
        css: this.elementService.styleStringWithBreakpoints(element),
      },
    })
  }

  @computed
  private get elementService() {
    return getElementService(this)
  }
}
