import type { IHydrateable } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement } from 'react'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'

export interface IRendererService
  extends IHydrateable<IRendererDto, IRendererModel> {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  renderRoot(renderer: IRendererModel): ReactElement | null
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
