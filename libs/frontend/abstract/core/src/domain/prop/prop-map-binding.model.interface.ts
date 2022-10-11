import { ICacheService } from '../../service'
import { IElementRef } from '../element'
import { IPropData } from './prop.model.interface'
import { IPropMapBindingDTO } from './prop-map-binding.dto.interface'

export interface IPropMapBinding
  extends ICacheService<IPropMapBindingDTO, IPropMapBinding> {
  id: string
  sourceKey: string
  targetKey: string
  targetElementId: IElementRef
  applyBindings(sourceProps: IPropData): IPropData
}
