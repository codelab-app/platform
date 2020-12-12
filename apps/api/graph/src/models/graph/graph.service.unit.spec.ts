import { Injectable } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EdgeEntity } from '../edge/edge.entity'
import { EdgeService } from '../edge/edge.service'
import { VertexEntity } from '../vertex/vertex.entity'
import { GraphEntity } from './graph.entity'
import { GraphService } from './graph.service'
import { NodeType } from '@codelab/alpha/shared/interface/node'
// eslint-disable-next-line import/order
import Mock = jest.Mock

type MockType<Repository> = { save: Mock; findOneOrFail: Mock }
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    save: jest.fn((entity) => entity),
    findOneOrFail: jest.fn((entity) => entity),
  }),
)
@Injectable()
class MockEdgeService {
  async findByTargetIds(src: string, target: string) {}
}

describe('GraphService Unit Test', () => {
  let graphService: GraphService
  let edgeService: EdgeService
  let graphRepositoryMock: MockType<Repository<GraphEntity>>

  beforeAll(async () => {
    const m = await Test.createTestingModule({
      providers: [
        GraphService,
        {
          provide: getRepositoryToken(GraphEntity),
          useFactory: repositoryMockFactory,
        },
        {
          provide: EdgeService,
          useFactory: () => {
            return new MockEdgeService()
          },
        },
      ],
    }).compile()

    graphService = m.get<GraphService>(GraphService)
    graphService.onModuleInit()
    edgeService = m.get<EdgeService>(EdgeService)
    graphRepositoryMock = m.get(getRepositoryToken(GraphEntity))
  })

  it('Should throw error if graphs are different', async () => {
    jest
      .spyOn(edgeService, 'findByTargetIds')
      .mockImplementation((src: string, target: string) => {
        const g1 = new GraphEntity()

        g1.id = 'g1'
        const g2 = new GraphEntity()

        g2.id = 'g2'
        const e1: EdgeEntity = {
          id: 'e1',
          source: 's1',
          target: 't1',
          graph: g1,
          order: 0,
        }
        const e2: EdgeEntity = {
          id: 'e2',
          source: 's2',
          target: 't2',
          graph: g2,
          order: 1,
        }

        return Promise.resolve([e1, e2])
      })

    await expect(graphService.moveVertex('t1', 't2')).rejects.toThrowError(
      'Vertices belong to different graphs',
    )
  })

  it('should throw error if only one vertex is found', async () => {
    jest
      .spyOn(edgeService, 'findByTargetIds')
      .mockImplementation((src: string, target: string) => {
        const g1 = new GraphEntity()

        g1.id = 'g1'
        const e1: EdgeEntity = {
          id: 'e1',
          source: 's1',
          target: 't1',
          graph: g1,
          order: 0,
        }

        return Promise.resolve([e1])
      })

    await expect(graphService.moveVertex('t1', 't2')).rejects.toThrowError(
      `Only one vertex id: t1 was found`,
    )
  })

  it('should move vertices correctly', async () => {
    const g1 = new GraphEntity()

    g1.id = 'g1'
    g1.vertices = []
    g1.edges = []

    const list: VertexEntity = {
      id: 'list',
      type: NodeType.React_List,
      graph: g1,
    }
    const a: VertexEntity = {
      id: 'a',
      type: NodeType.React_List_Item,
      graph: g1,
    }
    const b: VertexEntity = {
      id: 'b',
      type: NodeType.React_List_Item,
      graph: g1,
    }
    const c: VertexEntity = {
      id: 'c',
      type: NodeType.React_List_Item,
      graph: g1,
    }
    const d: VertexEntity = {
      id: 'd',
      type: NodeType.React_List_Item,
      graph: g1,
    }
    const e: VertexEntity = {
      id: 'e',
      type: NodeType.React_List_Item,
      graph: g1,
    }

    g1.addVertices([list, a, b, c, d, e])
    g1.addEdge(list.id, a.id)
    g1.addEdge(list.id, b.id)
    g1.addEdge(list.id, c.id)
    g1.addEdge(list.id, d.id)
    g1.addEdge(list.id, e.id)
    g1.edges.forEach((edge: EdgeEntity) => {
      edge.graph = g1
    })

    jest
      .spyOn(edgeService, 'findByTargetIds')
      .mockImplementation((src: string, target: string) => {
        return Promise.resolve([g1.edges[3], g1.edges[0]])
      })

    graphRepositoryMock.findOneOrFail.mockImplementation((id: string) => {
      return g1
    })
    const mockSavedGraph: GraphEntity = new GraphEntity()

    mockSavedGraph.id = g1.id
    mockSavedGraph.edges = [
      g1.edges[0],
      g1.edges[3],
      g1.edges[1],
      g1.edges[2],
      g1.edges[4],
    ]
    mockSavedGraph.edges.forEach((edge: EdgeEntity, index: number) => {
      edge.order = index
    })
    mockSavedGraph.vertices = g1.vertices
    graphRepositoryMock.save.mockReturnValue(Promise.resolve(mockSavedGraph))

    const result: GraphEntity = await graphService.moveVertex(d.id, a.id)

    expect(result.edges[0].target).toEqual('a')
    expect(result.edges[1].target).toEqual('d')
    expect(result.edges[2].target).toEqual('b')
    expect(result.edges[3].target).toEqual('c')
    expect(result.edges[4].target).toEqual('e')
  })
})
