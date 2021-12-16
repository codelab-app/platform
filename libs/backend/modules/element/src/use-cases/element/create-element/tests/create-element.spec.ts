import { testUserUid } from '@codelab/backend/shared/generic'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../../infrastructure/repositories/abstract/element-repository.interface'
import { setupElementUnitTestModule } from '../../../../test/setupElementUnitTestModule'
import { CreateElementService } from '../create-element.service'

describe('Create element unit test', function () {
  const testModule = setupElementUnitTestModule()
  let createElementService: CreateElementService
  let repository: IElementRepository

  beforeAll(() => {
    createElementService = testModule.app.get(CreateElementService)
    repository = testModule.app.get(IElementRepositoryToken)
  })

  it('should be injected', () => {
    expect(createElementService).toBeDefined()
  })

  it('should create element', async () => {
    const { id } = await createElementService.execute({
      input: { name: 'some element' },
      currentUser: { id: testUserUid } as any,
      transaction: null!, // No need for transaction, we're using in-memory db
    })

    const element = await repository.getOne(id, null!)

    expect(element).toBeDefined()
    expect(element?.name).toBe('some element')
  })
})
