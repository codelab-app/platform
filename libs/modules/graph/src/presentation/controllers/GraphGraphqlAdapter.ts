import { Injectable } from '@nestjs/common'
import {
  Args,
  Mutation,
  Query,
  Resolver,
  registerEnumType,
} from '@nestjs/graphql'
import { AddChildNodeInput } from '../../core/application/useCases/addChildNode/AddChildNodeInput'
import { AddChildNodeService } from '../../core/application/useCases/addChildNode/AddChildNodeService'
import { CreateGraphInput } from '../../core/application/useCases/createGraph/CreateGraphInput'
import { CreateGraphService } from '../../core/application/useCases/createGraph/CreateGraphService'
import { DeleteNodeInput } from '../../core/application/useCases/deleteNode/DeleteNodeInput'
import { DeleteNodeService } from '../../core/application/useCases/deleteNode/DeleteNodeService'
import { GetGraphInput } from '../../core/application/useCases/getGraph/GetGraphInput'
import { GetGraphService } from '../../core/application/useCases/getGraph/GetGraphService'
import { MoveNodeInput } from '../../core/application/useCases/moveNode/MoveNodeInput'
import { MoveNodeService } from '../../core/application/useCases/moveNode/MoveNodeService'
import { UpdateNodeInput } from '../../core/application/useCases/updateNode/UpdateNodeInput'
import { UpdateNodeService } from '../../core/application/useCases/updateNode/UpdateNodeService'
import { Graph } from '../../core/domain/graph/Graph'
import { VertexType } from '../../core/domain/vertex/VertexType'

registerEnumType(VertexType, {
  name: 'VertexType',
})
@Resolver('Graph')
@Injectable()
export class GraphGraphqlAdapter {
  constructor(
    private readonly createGraphService: CreateGraphService,
    private readonly addChildNodeService: AddChildNodeService,
    private readonly deleteNodeService: DeleteNodeService,
    private readonly updateNodeService: UpdateNodeService,
    private readonly moveNodeService: MoveNodeService,
    private readonly getGraphService: GetGraphService,
  ) {}

  @Mutation(() => Graph)
  async createGraph(@Args('input') input: CreateGraphInput) {
    return await this.createGraphService.execute(input)
  }

  @Mutation(() => Graph)
  async addChildNode(@Args('input') input: AddChildNodeInput) {
    return await this.addChildNodeService.execute(input)
  }

  @Mutation(() => Graph)
  async updateNode(@Args('input') input: UpdateNodeInput) {
    return await this.updateNodeService.execute(input)
  }

  @Query(() => Graph)
  async getGraph(@Args('input') input: GetGraphInput) {
    return await this.getGraphService.execute(input)
  }

  @Mutation(() => Graph)
  async deleteNode(@Args('input') input: DeleteNodeInput) {
    return await this.deleteNodeService.execute(input)
  }

  @Mutation(() => Graph)
  async moveNode(@Args('input') input: MoveNodeInput) {
    return await this.moveNodeService.execute(input)
  }
}
