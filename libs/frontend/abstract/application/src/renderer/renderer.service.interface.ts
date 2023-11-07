import type { IHydrateable, IPageNode } from '@codelab/frontend/abstract/domain'
import type { Nullable, Nullish } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'
import type { IRuntimeModel } from './runtime.model.interface'

export interface IRendererService
  extends IHydrateable<IRendererDto, IRendererModel> {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  getRuntimeModel(node: IPageNode): Nullish<IRuntimeModel>
  renderRoot(renderer: IRendererModel): ReactElement | null
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
