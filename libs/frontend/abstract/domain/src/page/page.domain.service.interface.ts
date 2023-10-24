import type {
  IElementRenderTypeDto,
  IPageDTO,
} from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IAppModel } from '../app'
import type { IPageModel } from './page.model.interface'

export type IPageAppFragment = Pick<IAppModel, 'id' | 'name'>

export interface IPageFactory {
  addSystemPages(
    app: IPageAppFragment,
    renderType: IElementRenderTypeDto,
  ): Array<IPageModel>
}

export interface IPageDomainService {
  pageFactory: IPageFactory
  pages: ObjectMap<IPageModel>

  hydrate(dto: IPageDTO): IPageModel
}
