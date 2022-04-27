import { Element } from '@codelab/frontend/modules/element'
import {
  IPropData,
  IRenderOutput,
  IRenderPipe,
} from '@codelab/shared/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { atomFactory } from '../../atoms'
import { RenderOutput } from '../abstract/RenderOutput'
import { getRenderService } from '../renderServiceContext'
import { evalCss } from '../utils/evalCss'

@model('@codelab/AtomRenderPipe')
export class AtomRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(element: Element, props: IPropData): ArrayOrSingle<IRenderOutput> {
    const renderer = getRenderService(this)

    if (!element.atom?.current) {
      if (renderer.debugMode) {
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

    if (renderer.debugMode) {
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
