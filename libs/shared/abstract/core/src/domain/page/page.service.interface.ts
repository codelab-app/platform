import { PageWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IQueryService,
} from '../../service'
import { ICreatePageDTO, IPageDTO, IUpdatePageDTO } from './page.dto.interface'
import { IPage } from './page.model.interface'

export interface IPageService
  extends ICRUDService<IPage, ICreatePageDTO, IUpdatePageDTO>,
    IQueryService<IPage, PageWhere>,
    ICRUDModalService<Ref<IPage>, { page: Maybe<IPage> }>,
    ICacheService<IPageDTO, IPage> {
  /**
   * Properties
   */
  pages: ObjectMap<IPage>
  pagesList: Array<IPage>
  page(id: string): Maybe<IPage>
  pagesByApp(appId: string): Array<IPage>
}
