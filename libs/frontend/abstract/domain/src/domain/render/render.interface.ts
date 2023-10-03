import type { IAtomType, IPropData } from '@codelab/shared/abstract/core'
import type { IElementModel } from '../element'
import type { IPropDataByElementId } from '../prop'
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
  element: IElementModel
  /** Any props that should get passed to descendants of this element, mapped by id */
  globalProps?: IPropDataByElementId
  props?: IPropData
}

export interface IBaseRenderPipe {
  id: string
  renderer: IRenderer
}

export interface IRenderPipe extends IBaseRenderPipe {
  next?: IRenderPipe
  render(element: IElementModel, props: IPropData): IRenderOutput
}
