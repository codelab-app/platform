import { teardownTestModule } from '@codelab/backend/shared/testing'
import { setupPropUnitTestModule } from '../../../test/setupPropUnitTestModule'
import { UpdatePropService } from '../update-prop.service'

describe('Update prop unit test', function () {
  const testModule = setupPropUnitTestModule()
  let updatePropService: UpdatePropService
  let propId: string

  beforeAll(async () => {
    updatePropService = testModule.app.get(UpdatePropService)

    const prop = await testModule.propRepo.create({
      data: '{"hello": "world"}',
      id: '',
    })

    propId = prop.id
  })

  afterAll(async () => {
    await teardownTestModule(testModule.app)
  })

  it('should inject UpdatePropService', async function () {
    expect(updatePropService).toBeDefined()
  })

  it('should update with valid prop data', async function () {
    const input = { id: propId, data: '{"hello": "new world!"}' }

    await updatePropService.execute({ transaction: null!, input })

    const prop = await testModule.propRepo.getOne(propId)

    expect(prop).toEqual({
      id: expect.stringContaining(''),
      data: input.data,
    })
  })

  it('should not update prop with invalid json', async function () {
    const input = { id: propId, data: '{"hello": }' }

    await expect(
      updatePropService.execute({
        transaction: null!,
        input,
      }),
    ).rejects.toThrow()
  })
})
