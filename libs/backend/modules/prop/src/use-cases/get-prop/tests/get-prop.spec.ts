import { PropSchema } from '@codelab/shared/abstract/core'
import { setupPropUnitTestModule } from '../../../test/setupPropUnitTestModule'
import { GetPropService } from '../get-prop.service'

describe('Get prop unit test', function () {
  const testModule = setupPropUnitTestModule()
  let getPropService: GetPropService

  beforeAll(() => {
    getPropService = testModule.app.get(GetPropService)
  })

  it('should inject GetPropService', async function () {
    expect(getPropService).toBeDefined()
  })

  it('should get a prop', async function () {
    const prop = PropSchema.parse({
      data: '{"hello": "world"}',
    })

    const { id } = await testModule.propRepo.create(prop)

    const retrieved = await getPropService.execute({
      transaction: null!,
      input: { propId: id },
    })

    expect(retrieved).toEqual({
      id: expect.stringContaining(''),
      data: prop.data,
    })
  })
})
