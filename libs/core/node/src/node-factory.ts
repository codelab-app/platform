import { NodeEntity } from './node-entity'
import { NodeCreateDto, NodeTypeEnum } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export interface EntityFactory<T> {
  fromDto<P extends Props = {}>(data: NodeCreateDto<NodeTypeEnum, P>): T
}

export class NodeFactory implements EntityFactory<NodeEntity> {
  fromDto(data: NodeCreateDto) {
    return new NodeEntity(data)
  }
}
