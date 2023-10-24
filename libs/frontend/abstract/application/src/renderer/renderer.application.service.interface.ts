import type {
  IElementModel,
  IRendererDomainService,
  IRendererModel,
  IRenderOutput,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { ReactElement, ReactNode } from 'react'
import type { ArrayOrSingle } from 'ts-essentials'

export interface IRendererApplicationService {
  rendererDomainService: IRendererDomainService

  // mobx transformer takes a single param
  renderChildren([renderer, parentOutput]: [
    IRendererModel,
    IRenderOutput,
  ]): ArrayOrSingle<ReactNode>
  renderElement(
    renderer: IRendererModel,
    element: IElementModel,
  ): Nullable<ReactElement>
  renderRoot(renderer: IRendererModel): ReactElement | null
}
