import type { IUrlDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { ICRUDService } from '../../service'
import type { ICreateUrlData, IUpdateUrlData } from './url.data.interface'
import type { IUrlModel } from './url.model.interface'
import type { IUrlRepository } from './url.repo.interface'

export interface IUrlService
  extends ICRUDService<IUrlModel, ICreateUrlData, IUpdateUrlData> {
  urlRepository: IUrlRepository
  urls: ObjectMap<IUrlModel>
  add(urlDTO: IUrlDTO): IUrlModel
}
