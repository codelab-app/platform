import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EdgeEntity } from '../models/edge/edge.entity'
import { GraphEntity } from '../models/graph/graph.entity'
import { UserEntity } from '../models/user/user.entity'
import { VertexEntity } from '../models/vertex/vertex.entity'
import { NodeType } from '@codelab/shared/interface/node'

@Injectable()
export class SeedDbService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(VertexEntity)
    private readonly vertexRepository: Repository<VertexEntity>,
    @InjectRepository(EdgeEntity)
    private readonly edgeRepository: Repository<EdgeEntity>,
    @InjectRepository(GraphEntity)
    private readonly graphRepository: Repository<GraphEntity>,
  ) {}

  async seedDB() {
    /**
     * Vertices
     */
    const vList = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List,
        props: {},
      }),
    )
    const vListItem0 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List_Item,
        props: {},
      }),
    )
    const vListItem1 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List_Item,
        props: {},
      }),
    )

    const vListItem2 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: NodeType.React_List_Item,
        props: {},
      }),
    )

    /**
     * Edges
     */
    const edge1 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 0,
        source: vList.id,
        target: vListItem0.id,
        props: {},
      }),
    )
    const edge2 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 1,
        source: vList.id,
        target: vListItem1.id,
        props: {},
      }),
    )

    const edge3 = await this.edgeRepository.save(
      this.edgeRepository.create({
        order: 2,
        source: vList.id,
        target: vListItem2.id,
        props: {},
      }),
    )

    /**
     * User
     */
    const user = await this.userRepository.save(
      this.userRepository.create({
        email: 'Codelab@gmail.com',
        password: 'password',
      }),
    )

    /**
     * Graph
     */
    const graph = await this.graphRepository.save(
      this.graphRepository.create({
        user,
        vertices: [vList, vListItem0, vListItem1, vListItem2],
        edges: [edge1, edge2, edge3],
      }),
    )
  }
}
