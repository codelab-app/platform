import type { ICRUDService } from '../../service'
import type {
  ICreatePropData,
  IPropDTO,
  IUpdatePropData,
} from './prop.dto.interface'
import type { IProp } from './prop.model.interface'

export interface IPropService
  extends ICRUDService<IProp, ICreatePropData, IUpdatePropData> {
  add(propDTO: IPropDTO): IProp
}
