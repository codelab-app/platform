import type { ICRUDService } from '../../service'
import type {
  ICreatePropData,
  IPropDTO,
  IUpdatePropData,
} from './prop.dto.interface'
import type { IProp } from './prop.model.interface'
import type { IPropRepository } from './prop.repo.interface'

export interface IPropService
  extends ICRUDService<IProp, ICreatePropData, IUpdatePropData> {
  propRepository: IPropRepository
  add(propDTO: IPropDTO): IProp
}
