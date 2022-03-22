import { DATA_COMPONENT_ID } from '@codelab/frontend/abstract/core'
import { ElementModel } from '@codelab/frontend/modules/element'
import { PropsData, PropsDataByElementId } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'
import { Model, model, prop } from 'mobx-keystone'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderPipe } from '../abstract/IRenderPipe'
import { getRenderContext } from '../renderContext'
import { RenderOutput } from '../RenderOutput'

@model('@codelab/AtomRenderPipe')
export class ComponentRenderPipe
  extends Model({ next: prop<IRenderPipe>() })
  implements IRenderPipe
{
  render(
    element: ElementModel,
    props: PropsData,
    extraElementProps?: PropsDataByElementId,
  ): Nullable<ArrayOrSingle<RenderOutput>> {
    const renderer = getRenderContext(this)
    const componentInstance = element.instanceOfComponent?.current

    if (!componentInstance) {
      return this.next.render(element, props, extraElementProps)
    }

    const componentProp = { [DATA_COMPONENT_ID]: element.id }

    const rootElement =
      renderer.tree.getRootElementOfComponent(componentInstance)

    if (!rootElement) {
      return this.next.render(element, props, extraElementProps)
    }

    // Start the pipe again with the root element
    return renderer.renderElement(
      rootElement,
      mergeProps(componentProp, props),
      extraElementProps,
    )
  }
}
