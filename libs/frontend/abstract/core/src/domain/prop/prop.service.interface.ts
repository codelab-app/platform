import type { IPropDTO } from './prop.dto.interface'
import type { IProp } from './prop.model.interface'

export interface IPropService {
  add(propDTO: IPropDTO): IProp
}
