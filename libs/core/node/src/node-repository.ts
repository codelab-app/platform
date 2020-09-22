import axios from 'axios'
import { NodeCreateDto, NodeDtoA } from '@codelab/shared/interface/node'

export interface MongooseRepository {
  save<T, R>(data: T): Promise<R>
}

export class NodeRepository implements MongooseRepository {
  save<CreateDto = NodeCreateDto, A = NodeDtoA>(data: CreateDto): Promise<A> {
    return axios.post('')
  }

  get<A = NodeDtoA>(id: string): Promise<A> {
    return axios.get('')
  }
}
