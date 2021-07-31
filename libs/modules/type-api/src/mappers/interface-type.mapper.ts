import { DgraphInterfaceType, Mapper } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { InterfaceType } from '../models'

export type InterfaceTypeMapperInput = Omit<DgraphInterfaceType, 'fields'>

@Injectable()
export class InterfaceTypeMapper
  implements Mapper<InterfaceTypeMapperInput, InterfaceType>
{
  map({ uid: id, name }: InterfaceTypeMapperInput) {
    return new InterfaceType(id, name)
  }
}
