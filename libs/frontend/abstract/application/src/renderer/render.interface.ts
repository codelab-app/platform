import type { IPropDataByElementId } from '@codelab/frontend/abstract/domain'
import type { IAtomType, IPropData } from '@codelab/shared/abstract/core'
import type { IRendererModel } from './renderer.model.interface'
import type { IRuntimeElementModel } from './runtime-element'

/**
 * This is the intermediate output from rendering a single Element
 */
export interface IRenderOutput {
  atomType?: IAtomType
  /** Any props that should get passed to descendants of this element, mapped by id */
  globalProps?: IPropDataByElementId
  props: IPropData
  /** This is the element which this RenderOutput was rendered from */
  runtimeElement: IRuntimeElementModel
}

export interface IBaseRenderPipe {
  id: string
  renderer: IRendererModel
}

export interface IRenderPipe extends IBaseRenderPipe {
  next?: IRenderPipe

  render(element: IRuntimeElementModel): IRenderOutput
}
