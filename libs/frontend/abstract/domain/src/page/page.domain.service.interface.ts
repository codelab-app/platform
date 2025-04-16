import type {
  IAppDto,
  IElementRenderTypeDto,
  IPageDto,
} from '@codelab/shared-abstract-core'
import type { ObjectMap } from 'mobx-keystone'

import type { IAppModel } from '../app'
import type { IHydrateable } from '../shared'
import type { IPageModel } from './page.model.interface'

export type IPageAppFragment = Pick<IAppModel, 'id' | 'name'>

export interface IPageDomainFactory {
  addSystemPages(
    app: IAppDto,
    renderType: IElementRenderTypeDto,
  ): Array<IPageDto>
}

export interface IPageDomainService extends IHydrateable<IPageDto, IPageModel> {
  pages: ObjectMap<IPageModel>
  pagesList: Array<IPageModel>
  page(id: string): IPageModel
}
