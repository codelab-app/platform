import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EdgeEntity } from '../models/edge/edge.entity'
import { GraphEntity } from '../models/graph/graph.entity'
import { UserEntity } from '../models/user/user.entity'
import { VertexEntity } from '../models/vertex/vertex.entity'

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
    const user = new UserEntity()

    user.username = 'john'

    await this.userRepository.save(user)

    const graph = new GraphEntity()

    graph.user = user

    await this.graphRepository.save(graph)

    const vertex1 = new VertexEntity()

    vertex1.id = 'v-A'
    vertex1.graph = graph
    vertex1.props = {}

    const vertex2 = new VertexEntity()

    vertex2.id = 'v-B'
    vertex2.graph = graph
    vertex2.props = {}

    const vertex3 = new VertexEntity()

    vertex3.id = 'v-C'
    vertex3.graph = graph
    vertex3.props = {}

    await this.vertexRepository.save([vertex1, vertex2, vertex3])

    const edge1 = new EdgeEntity()

    edge1.id = 'e-A'
    edge1.source = 'v-A'
    edge1.target = 'v-B'
    edge1.graph = graph
    edge1.props = {}

    const edge2 = new EdgeEntity()

    edge2.id = 'e-B'
    edge2.source = 'v-A'
    edge2.target = 'v-C'
    edge2.graph = graph
    edge2.props = {}

    await this.edgeRepository.save([edge1, edge2])
  }
}
