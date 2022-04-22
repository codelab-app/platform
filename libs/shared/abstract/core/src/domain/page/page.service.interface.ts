import { PageWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ObjectMap } from 'mobx-keystone'
import { ICRUDService, IQueryService } from '../../service/service.interface'
import { ICreatePageDTO, IUpdatePageDTO } from './page.dto.interface'
import { IPage } from './page.interface'

export interface IPageService
  extends ICRUDService<IPage, ICreatePageDTO, IUpdatePageDTO>,
    IQueryService<IPage, PageWhere> {
  /**
   * Properties
   */
  pages: ObjectMap<IPage>
  pagesList: Array<IPage>
  page(id: string): Maybe<IPage>

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
