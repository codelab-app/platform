import axios from 'axios'
import { NodeFactory } from './node-factory'
import { NodeA, NodeCreate } from '@codelab/shared/interface/node'

export abstract class MongooseRepository {
  factory: NodeFactory

  constructor(factory: NodeFactory) {
    this.factory = factory
  }

  abstract save<T, R>(data: T): Promise<R>
}

/**
 * The repository layer is responsible for interacting with the database. We access data to be used from the factory, which has a mapper set prior to this function.
 */
export class NodeRepository extends MongooseRepository {
  save<CreateDto = NodeCreate, A = NodeA>(): Promise<A> {
    const data = this.factory.mapData()

    // post data

    return axios.post('')
  }

  get<A = NodeA>(id: string): Promise<A> {
    return axios.get('')
  }
}
