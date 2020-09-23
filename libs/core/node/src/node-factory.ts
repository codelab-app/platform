import { NodeEntity } from './node-entity'
import { NodeCreate, NodeTypeEnum } from '@codelab/shared/interface/node'
import { Props } from '@codelab/shared/interface/props'

export interface EntityFactory<T> {
  fromDto<P extends Props = {}>(data: NodeCreate<NodeTypeEnum, P>): T
}

export class NodeFactory implements EntityFactory<NodeEntity> {
  fromDto(data: NodeCreate) {
    return new NodeEntity(data)
  }
}
