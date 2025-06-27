import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { Test } from '@nestjs/testing'

import { AbstractRepository } from './abstract.repository'

// Mock types that satisfy IRef constraint
interface MockDto {
  id: string
}

interface MockModel {
  id: string
}

interface MockWhere {
  id?: string | null
}

// Mock implementation for testing
class TestRepository extends AbstractRepository<
  'Test',
  MockDto,
  MockModel,
  MockWhere,
  unknown
> {
  protected _addMany = jest.fn()

  protected _find = jest.fn()

  protected _update = jest.fn()
}

class UserAuthRepository extends AbstractRepository<
  'UserAuth',
  MockDto,
  MockModel,
  MockWhere,
  unknown
> {
  protected _addMany = jest.fn()

  protected _find = jest.fn()

  protected _update = jest.fn()
}

describe('AbstractRepository', () => {
  let repository: TestRepository
  let userAuthRepository: UserAuthRepository
  let loggerService: jest.Mocked<PinoLoggerService>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TestRepository,
        UserAuthRepository,
        {
          provide: PinoLoggerService,
          useValue: {
            debug: jest.fn(),
            error: jest.fn(),
            verbose: jest.fn(),
            verboseWithTiming: jest.fn().mockImplementation((_, fn) => fn()),
          },
        },
      ],
    }).compile()

    repository = module.get<TestRepository>(TestRepository)
    userAuthRepository = module.get<UserAuthRepository>(UserAuthRepository)
    loggerService = module.get(PinoLoggerService)
  })

  describe('getNamespace', () => {
    it('should convert simple repository names correctly', () => {
      // Access protected method for testing
      const namespace = (
        repository as unknown as { getNamespace(): string }
      ).getNamespace()

      expect(namespace).toBe('repository:test')
    })

    it('should handle operations correctly', () => {
      const namespace = (
        repository as unknown as { getNamespace(op: string): string }
      ).getNamespace('add')

      expect(namespace).toBe('repository:test:add')
    })

    it('should convert camelCase repository names to kebab-case', () => {
      const namespace = (
        userAuthRepository as unknown as { getNamespace(): string }
      ).getNamespace()

      expect(namespace).toBe('repository:user-auth')
    })

    it('should handle operations with camelCase repositories', () => {
      const namespace = (
        userAuthRepository as unknown as {
          getNamespace(op: string): string
        }
      ).getNamespace('findOne')

      expect(namespace).toBe('repository:user-auth:findOne')
    })
  })

  describe('logging with namespaces', () => {
    it('should use namespace in add method', async () => {
      const testData = { id: '123' }

      ;(
        repository as unknown as { _addMany: jest.Mock }
      )._addMany.mockResolvedValue([testData])

      await repository.add(testData)

      expect(loggerService.verboseWithTiming).toHaveBeenCalledWith(
        'Adding item',
        expect.any(Function),
        expect.objectContaining({
          context: 'repository:test:add',
        }),
      )
    })

    it('should use namespace in error logging', async () => {
      const testError = new Error('Test error')

      ;(
        repository as unknown as { _addMany: jest.Mock }
      )._addMany.mockRejectedValue(testError)

      await expect(repository.add({ id: '123' })).rejects.toThrow()

      expect(loggerService.error).toHaveBeenCalledWith(
        'Failed to add item',
        expect.objectContaining({
          context: 'repository:test:add',
        }),
      )
    })
  })
})
