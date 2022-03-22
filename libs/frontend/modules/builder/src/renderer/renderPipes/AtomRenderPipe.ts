import { ElementModel } from '@codelab/frontend/modules/element'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { css } from '@emotion/react'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { atomFactory } from '../../atoms'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { RenderOutput } from '../RenderOutput'
import { evalCss } from '../utils/evalCss'

@model('@codelab/AtomRenderPipe')
export class AtomRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(
    element: ElementModel,
    props: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>> {
    if (!element.atom?.current) {
      return this.next.render(element, props, extraElementProps)
    }

    const [ReactComponent, atomProps] = atomFactory({
      atomType: element.atom.current.type,
      node: element,
    })

    if (!ReactComponent) {
      return this.next.render(element, props, extraElementProps)
    }

    const mergedProps = mergeProps(atomProps, props)
    const elCss = element.css ? css(evalCss(element.css)) : undefined

    return {
      elementId: element.id,
      atomType: element.atom.current.type,
      props: { ...mergedProps, css: elCss },
      descendantPropBindings: extraElementProps,
    }
  }
}
