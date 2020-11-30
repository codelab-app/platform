import { Injectable } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EdgeEntity } from '../edge/edge.entity'
import { EdgeService } from '../edge/edge.service'
import { GraphEntity } from './graph.entity'
import { GraphService } from './graph.service'
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
      graph: g1,
      order: 1,
    }

    const e3: EdgeEntity = {
      id: 'e3',
      source: 's3',
      target: 't3',
      graph: g1,
      order: 2,
    }

    jest
      .spyOn(edgeService, 'findByTargetIds')
      .mockImplementation((src: string, target: string) => {
        return Promise.resolve([e1, e2])
      })

    graphRepositoryMock.findOneOrFail.mockImplementation((id: string) => {
      g1.edges = [e1, e2, e3]

      return g1
    })
    const mockSavedGraph: GraphEntity = new GraphEntity()

    mockSavedGraph.id = 'g1'
    e3.order = 0
    e1.order = 1
    e2.order = 2
    mockSavedGraph.edges = [e1, e2, e3]
    graphRepositoryMock.save.mockReturnValue(Promise.resolve(mockSavedGraph))

    const result: GraphEntity = await graphService.moveVertex('t3', 't1')

    expect(result.edges[0].target).toEqual('t3')
    expect(result.edges[1].target).toEqual('t1')
    expect(result.edges[2].target).toEqual('t2')
  })
})
