import type {
  IElementModel,
  IPropDataByElementId,
} from '@codelab/frontend/abstract/domain'
import type { IAtomType, IPropData } from '@codelab/shared/abstract/core'
import type { IRendererModel } from './renderer.model.interface'
import type { IRuntimeElement } from './runtime-element.model.interface'

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
  shouldRender?: boolean
}

export interface IBaseRenderPipe {
  id: string
  renderer: IRendererModel
}

export interface IRenderPipe extends IBaseRenderPipe {
  next?: IRenderPipe

  render(element: IRuntimeElement): IRenderOutput
}
