import { NodeFactory } from './node-factory'
import { CreateFormStrategy } from './node-mapper'
import { NodeRepository } from './node-repository'
import { IsValidCreateDtoModel } from './node-specification'
import { Validator } from './validator'
import { NodeI } from '@codelab/alpha/shared/interface/node'

/**
 * Our application layer interacts with our domain objects via services Although they include CRUD methods, they can include domain language specific methods like `move` node or `swap` node.
 */
export class NodeService {
  validator

  factory

  repository

  constructor() {
    this.validator = new Validator()
    this.factory = new NodeFactory()
    this.repository = new NodeRepository(this.factory)
  }

  findNode(id: string) {
    return this.repository.get(id).catch((err: any) => err)
  }

  createNode(data: NodeI, cb: Function) {
    this.validator.addRule(new IsValidCreateDtoModel()).validate(data)

    this.factory.setData(data)
    this.factory.setStrategy(new CreateFormStrategy())

    this.repository.save(cb).catch((err: any) => err)
  }

  getNodes(cb: Function) {
    this.factory.setStrategy(new CreateFormStrategy())

    this.repository.getAll(cb).catch((err: any) => err)
  }

  updateNode(data: NodeI, cb: Function) {
    this.validator.addRule(new IsValidCreateDtoModel()).validate(data)

    this.factory.setData(data)
    this.factory.setStrategy(new CreateFormStrategy())

    this.repository.update(cb).catch((err: any) => err)
  }

  deleteNode(id: string, cb: Function) {
    this.factory.setStrategy(new CreateFormStrategy())

    this.repository.delete(id, cb).catch((err: any) => err)
  }

  // updateModel() {}

  // editModel() {}
}
