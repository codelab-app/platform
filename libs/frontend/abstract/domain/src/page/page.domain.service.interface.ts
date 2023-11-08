import type {
  IElementRenderTypeDto,
  IPageDTO,
} from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { IAppModel } from '../app'
import type { IHydrateable } from '../shared'
import type { IPageModel } from './page.model.interface'

export type IPageAppFragment = Pick<IAppModel, 'id' | 'name'>

export interface IPageFactory {
  addSystemPages(
    app: IPageAppFragment,
    renderType: IElementRenderTypeDto,
  ): Array<IPageModel>
}

export interface IPageDomainService extends IHydrateable<IPageDTO, IPageModel> {
  pageFactory: IPageFactory
  pages: ObjectMap<IPageModel>
  pagesList: Array<IPageModel>
}
