import type {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/frontend/abstract/core'
import { css } from '@emotion/react'
import { ExtendedModel, model, prop } from 'mobx-keystone'
import type { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'
import { atomFactory } from '../atoms'
import { evalCss } from '../utils/evalCss'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/AtomRenderPipe')
export class AtomRenderPipe
  extends ExtendedModel(BaseRenderPipe, {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (!element.atom?.current) {
      if (this.renderer.debugMode) {
        console.info(`AtomRenderPipe: No atom found`, { element: element.name })
      }

      return this.next.render(element, props)
    }

    const [ReactComponent, newProps] = atomFactory({
      atomType: element.atom.current.type,
      node: element,
      props,
    })

    if (!ReactComponent) {
      console.warn(
        `AtomRenderPipe: No RootComponent found for atom type ${element.atom.current.type}`,
      )

      return this.next.render(element, props)
    }

    const elCss =
      element.customCss || element.guiCss
        ? css([
            JSON.parse(element.guiCss || '{}'),
            evalCss(element.customCss || ''),
          ])
        : undefined

    if (this.renderer.debugMode) {
      console.info(
        `AtomRenderPipe: Rendering atom ${element.atom.current.type}`,
        { element: element.name },
      )
    }

    return RenderOutput.withAtom({
      element,
      atomType: element.atom.current.type,
      props: { ...newProps, css: elCss },
    })
  }
}
