import { NodeCreateDto } from '@codelab/shared/interface/node'

export interface MongooseRepository {
  save<T>(data: T): Promise<T>
}

export class NodeRepository implements MongooseRepository {
  save<NodeCreateDto>(data: NodeCreateDto): Promise<any> {
    return Promise.resolve('test')
  }
}
