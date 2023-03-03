import type { IPropDTO } from '@codelab/shared/abstract/core'
import type { ICRUDService } from '../../service'
import type { ICreatePropData, IUpdatePropData } from './prop.data.interface'
import type { IProp } from './prop.model.interface'

export interface IPropService
  extends ICRUDService<IProp, ICreatePropData, IUpdatePropData> {
  add(propDTO: IPropDTO): IProp
}
