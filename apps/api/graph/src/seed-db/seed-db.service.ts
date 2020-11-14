import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EdgeEntity } from '../models/edge/edge.entity'
import { GraphEntity } from '../models/graph/graph.entity'
import { UserEntity } from '../models/user/user.entity'
import { VertexEntity } from '../models/vertex/vertex.entity'
import { VertexType } from '@codelab/shared/interface/graph'

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
    const vertex1 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: VertexType.REACT_BUTTON,
        props: {},
      }),
    )
    const vertex2 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: VertexType.REACT_BUTTON,
        props: {},
      }),
    )
    const vertex3 = await this.vertexRepository.save(
      this.vertexRepository.create({
        type: VertexType.REACT_BUTTON,
        props: {},
      }),
    )

    /**
     * Edges
     */
    const edge1 = await this.edgeRepository.save(
      this.edgeRepository.create({
        source: vertex1.id,
        target: vertex2.id,
        props: {},
      }),
    )
    const edge2 = await this.edgeRepository.save(
      this.edgeRepository.create({
        source: vertex2.id,
        target: vertex3.id,
        props: {},
      }),
    )

    /**
     * User
     */
    const user = await this.userRepository.save(
      this.userRepository.create({
        username: 'Codelab',
        password: 'password',
      }),
    )

    /**
     * Graph
     */
    const graph = await this.graphRepository.save(
      this.graphRepository.create({
        user,
        vertices: [vertex1, vertex2, vertex3],
        edges: [edge1, edge2],
      }),
    )
  }
}
