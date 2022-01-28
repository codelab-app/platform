import { setupPropUnitTestModule } from '../../../test/setupPropUnitTestModule'
import { CreatePropService } from '../create-prop.service'

describe('Create prop unit test', function () {
  const testModule = setupPropUnitTestModule()
  let createPropService: CreatePropService

  beforeAll(() => {
    createPropService = testModule.app.get(CreatePropService)
  })

  it('should inject CreatePropService', async function () {
    expect(createPropService).toBeDefined()
  })

  it('should create valid prop', async function () {
    const input = {
      data: '{"hello": "world"}',
    }

    const { id } = await createPropService.execute({
      transaction: null!,
      input,
    })

    const prop = await testModule.propRepo.getOne(id)

    expect(prop).toEqual({
      id: expect.stringContaining(''),
      data: input.data,
    })
  })

  it('should not create prop with invalid json', async function () {
    const input = {
      data: '{"hello": }',
    }

    await expect(
      createPropService.execute({
        transaction: null!,
        input,
      }),
    ).rejects.toThrow()
  })
})
