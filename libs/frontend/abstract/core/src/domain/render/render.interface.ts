import { IAtomType } from '@codelab/shared/abstract/core'
import { ArrayOrSingle } from 'ts-essentials'
import { IRenderer } from '../builder'
import { IComponentService } from '../component'
import { IElement, IElementService } from '../element'
import { IPropData, IPropDataByElementId } from '../prop'

export enum RendererTab {
  Page = 'Page',
  Component = 'Component',
}

/**
 * This is the intermediate output from rendering a single Element
 */
export interface IRenderOutput {
  /** This is the id of the element which this RenderOutput was rendered from */
  elementId: string
  atomType?: IAtomType
  props?: IPropData
  /** Any props that should get passed to descendants of this element, mapped by id */
  globalProps?: IPropDataByElementId
}

export interface IBaseRenderPipe {
  id: string
  renderer: IRenderer
  elementService: IElementService
  componentService: IComponentService
}

export interface IRenderPipe extends IBaseRenderPipe {
  next?: IRenderPipe
  render(element: IElement, props: IPropData): ArrayOrSingle<IRenderOutput>
}
