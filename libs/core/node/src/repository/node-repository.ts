import axios from 'axios'
import { NodeFactory } from './node-factory'
import { NodeA } from '@codelab/shared/interface/node'

export abstract class MongooseRepository {
  factory: NodeFactory

  constructor(factory: NodeFactory) {
    this.factory = factory
  }

  abstract save<R>(cb: Function): Promise<R>

  abstract getAll<R>(cb: Function): Promise<R>

  abstract update<R>(cb: Function): Promise<R>

  abstract delete<R>(id: string, cb: Function): Promise<R>
}

/**
 * The repository layer is responsible for interacting with the database. We access data to be used from the factory, which has a mapper set prior to this function.
 */
export class NodeRepository extends MongooseRepository {
  save<A = NodeA>(cb: Function): Promise<A> {
    const data = this.factory.mapData()

    return axios
      .post('node', data)
      .then((res) => cb(this.factory.mapRes(res.data)))
  }

  get<A = NodeA>(id: string): Promise<A> {
    return axios.get('')
  }

  getAll<A = NodeA>(cb: Function): Promise<A> {
    return axios.get('node').then((res) => cb(this.factory.mapRes(res.data)))
  }

  update<A = NodeA>(cb: Function): Promise<A> {
    const { id, ...data } = this.factory.mapData()

    return axios
      .patch(`node/${id}`, data)
      .then((res) => cb(this.factory.mapRes(res.data)))
  }

  delete<A = NodeA>(id: string, cb: Function): Promise<A> {
    return axios.delete(`node/${id}`).then((res) => cb(res.data))
  }
}
