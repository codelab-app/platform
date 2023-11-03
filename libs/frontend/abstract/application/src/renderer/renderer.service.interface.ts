import type { Nullable } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'
import type { IRenderOutput } from './render.interface'
import type { IRendererDto } from './renderer.dto.interface'
import type { IRendererModel } from './renderer.model.interface'

export interface IRendererService {
  activeRenderer: Nullable<Ref<IRendererModel>>
  renderers: ObjectMap<IRendererModel>

  hydrate(props: IRendererDto): IRendererModel
  // mobx trans former takes a single param
  renderChildren([renderer, parentOutput]: [
    IRendererModel,
    IRenderOutput,
  ]): ArrayOrSingle<ReactNode>

  renderRoot(renderer: IRendererModel): ReactElement | null
  setActiveRenderer(renderer: Ref<IRendererModel>): void
}