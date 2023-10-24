import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'

export interface IRendererDomainService {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  hydrate(props: IRendererDto): IRendererModel
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
