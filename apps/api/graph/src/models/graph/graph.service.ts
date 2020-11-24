import { Injectable, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import {
  ApolloCodelabError,
  AppErrorEnum,
} from '../../app/filters/ApolloCodelabError'
import { EdgeService } from '../edge/edge.service'
import { GraphEntity } from './graph.entity'

@Injectable()
export class GraphService implements OnModuleInit {
  declare edgeService: EdgeService

  constructor(
    @InjectRepository(GraphEntity)
    private readonly graphEntityRepository: Repository<GraphEntity>,
    private moduleRef: ModuleRef,
  ) {}

  async findAll(): Promise<Array<GraphEntity>> {
    return this.graphEntityRepository.find()
  }

  async findOne(graphId: string): Promise<GraphEntity> {
    return this.graphEntityRepository.findOneOrFail(graphId, {
      relations: ['vertices', 'edges'],
    })
  }

  async moveVertex(src: string, target: string): Promise<GraphEntity> {
    const edges = await this.edgeService.findByTargetIds(src, target)

    if (edges.length === 2) {
      const sameGraph = edges[0].graph.id === edges[1].graph.id

      if (sameGraph) {
        const graph = await this.graphEntityRepository.findOneOrFail(
          edges[0].graph.id,
          {
            relations: ['vertices', 'edges'],
          },
        )

        graph.moveVertexById(src, target)
        const savedGraph = await this.graphEntityRepository.save(graph)

        savedGraph.sortEdges()

        return savedGraph
      }

      throw new ApolloCodelabError(
        'Vertices belong to different graphs',
        AppErrorEnum.OTHER,
      )
    } else {
      throw new ApolloCodelabError(
        `Only one vertex id: ${edges[0].target} was found`,
        AppErrorEnum.OTHER,
      )
    }
  }

  onModuleInit(): any {
    this.edgeService = this.moduleRef.get(EdgeService, { strict: false })
  }
}
