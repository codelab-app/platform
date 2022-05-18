import {
  IElement,
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import { ExtendedModel, model, modelClass, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { atomFactory } from '../../atoms'
import { RenderOutput } from '../abstract/RenderOutput'
import { evalCss } from '../utils/evalCss'
import { BaseRenderPipe } from './renderPipe.base'

@model('@codelab/AtomRenderPipe')
export class AtomRenderPipe
  extends ExtendedModel(modelClass(BaseRenderPipe), {
    next: prop<IRenderPipe>(),
  })
  implements IRenderPipe
{
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput> {
    if (!element.atom?.current) {
      if (this.renderer.current.debugMode) {
        console.info(`AtomRenderPipe: No atom found`, { element: element.name })
      }

      return this.next.render(element, props)
    }

    const [ReactComponent, atomProps] = atomFactory({
      atomType: element.atom.current.type,
      node: element,
    })

    if (!ReactComponent) {
      console.warn(
        `AtomRenderPipe: No RootComponent found for atom type ${element.atom.current.type}`,
      )

      return this.next.render(element, props)
    }

    const mergedProps = mergeProps(atomProps, props)
    const elCss = element.css ? css(evalCss(element.css)) : undefined

    if (this.renderer.current.debugMode) {
      console.info(
        `AtomRenderPipe: Rendering atom ${element.atom.current.type}`,
        { element: element.name },
      )
    }

    return RenderOutput.withAtom({
      elementId: element.id,
      atomType: element.atom.current.type,
      props: { ...mergedProps, css: elCss },
    })
  }
}
