import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../../infrastructure/element-repository.interface'
import { setupElementUnitTestModule } from '../../../../test/setupElementUnitTestModule'

// This test will use the in memory element repository, so it will be very fast
describe('Create element unit test', function () {
  const testModule = setupElementUnitTestModule()

  it('should have the element repository', () => {
    expect(
      testModule.app.get<IElementRepository>(IElementRepositoryToken),
    ).toBeDefined()
  })
})
