import { DgraphComponentType } from '@codelab/backend/infra'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { ComponentType } from '../models'

export type ComponentTypeMapperInput = DgraphComponentType

@Injectable()
export class ComponentTypeMapper
  implements Mapper<ComponentTypeMapperInput, ComponentType>
{
  map({ uid: id, name }: ComponentTypeMapperInput) {
    return new ComponentType(id, name)
  }
}
