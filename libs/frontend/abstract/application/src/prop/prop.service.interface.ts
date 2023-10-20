import type {
  ICreatePropData,
  IPropModel,
  IUpdatePropData,
  IUpdatePropDataWithDefaultValues,
} from '@codelab/frontend/abstract/domain'
import type { IPropDTO } from '@codelab/shared/abstract/core'
import type { ObjectMap } from 'mobx-keystone'
import type { ICRUDService } from '../services'
import type { IPropRepository } from './prop.repo.interface'

export interface IPropService
  extends ICRUDService<IPropModel, ICreatePropData, IUpdatePropData> {
  propRepository: IPropRepository
  props: ObjectMap<IPropModel>
  add(propDTO: IPropDTO): IPropModel
  reset(id: string): void
  updateWithDefaultValuesApplied(
    data: IUpdatePropDataWithDefaultValues,
  ): Promise<IPropModel>
}
