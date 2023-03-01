import type { IPropDTO } from './prop.dto.interface'
import type { IProp, IPropData } from './prop.model.interface'

export interface IPropService {
  add<TData extends IPropData>(propDTO: IPropDTO<TData>): IProp<TData>
}
