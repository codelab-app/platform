import { NodeEntity } from './node-entity'
import { CreateNodeDTO } from './node-repository'

export interface EntityFactory<T> {
  fromDTO<DTO>(data: DTO): T
}

export class NodeFactory implements EntityFactory<NodeEntity> {
  fromDTO<CreateNodeDTO>(data: CreateNodeDTO) {
    return new NodeEntity()
  }
}
