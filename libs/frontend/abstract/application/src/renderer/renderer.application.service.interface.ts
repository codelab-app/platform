import type {
  IElementModel,
  IRendererDomainService,
  IRendererDto,
  IRendererModel,
  IRenderOutput,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'

export interface IRendererApplicationService {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  hydrate(props: IRendererDto): IRendererModel
  // mobx transformer takes a single param
  renderChildren([renderer, parentOutput]: [
    IRendererModel,
    IRenderOutput,
  ]): ArrayOrSingle<ReactNode>

  renderRoot(renderer: IRendererModel): ReactElement | null
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}
