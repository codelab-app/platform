import type { IAtomType } from '@codelab/shared/abstract/core'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IComponentService } from '../component'
import type { IElement, IElementService } from '../element'
import type { IPropData, IPropDataByElementId } from '../prop'
import type { IRenderer } from './renderer.model.interface'

export enum RendererTab {
  Component = 'Component',
  Page = 'Page',
}

/**
 * This is the intermediate output from rendering a single Element
 */
export interface IRenderOutput {
  atomType?: IAtomType
  /** This is the element which this RenderOutput was rendered from */
  element: IElement
  /** Any props that should get passed to descendants of this element, mapped by id */
  globalProps?: IPropDataByElementId
  props?: IPropData
}

export interface IBaseRenderPipe {
  componentService: IComponentService
  elementService: IElementService
  id: string
  renderer: IRenderer
}

export interface IRenderPipe extends IBaseRenderPipe {
  next?: IRenderPipe
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput>
}
