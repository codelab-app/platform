import { PageWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap, Ref } from 'mobx-keystone'
import { ICRUDModalService, ICRUDService, IQueryService } from '../../service'
import { IElementTree } from '../element'
import { ICreatePageDTO, IUpdatePageDTO } from './page.dto.interface'
import { IPage } from './page.model.interface'

export interface IPageService
  extends ICRUDService<IPage, ICreatePageDTO, IUpdatePageDTO>,
    IQueryService<IPage, PageWhere>,
    ICRUDModalService<Ref<IPage>, { page: Maybe<IPage> }> {
  /**
   * Properties
   */
  pages: ObjectMap<IPage>
  pagesList: Array<IPage>
  deleteManyByAppId(id: string): Promise<void>
  page(id: string): Maybe<IPage>
  pagesByApp(appId: string): Array<IPage>

  /**
   * Mapped by pageIds, these are the actual page that is rendered
   */
  elementTrees: ObjectMap<IElementTree>

  /**
   * Queries
   */
  // getOne(id: string): Promise<Maybe<IPage>>
  // getAll(where?: PageWhere): Promise<Array<IPage>>

  /**
   * Mutations
   */
  // create(data: ICreatePageDTO, ownerId: string): Promise<IPage>
  // update(existing: IPage, data: IUpdatePageDTO): Promise<IPage>
  // delete(id: string): Promise<IPage>
}
