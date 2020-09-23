import axios from 'axios'
import { NodeA, NodeCreate } from '@codelab/shared/interface/node'

export interface MongooseRepository {
  save<T, R>(data: T): Promise<R>
}

export class NodeRepository implements MongooseRepository {
  save<CreateDto = NodeCreate, A = NodeA>(data: CreateDto): Promise<A> {
    return axios.post('')
  }

  get<A = NodeA>(id: string): Promise<A> {
    return axios.get('')
  }
}
