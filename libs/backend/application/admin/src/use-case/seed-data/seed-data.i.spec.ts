import { AdminService } from '@codelab/backend/domain/admin'
import { FieldRepository } from '@codelab/backend/domain/type'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { getDriver } from '@codelab/backend/infra/adapter/neo4j'
import { setupNewUser } from '@codelab/backend/shared/util'
import type { IUserDTO } from '@codelab/frontend/abstract/core'
import { SeedDataService } from './seed-data.service'

let user: IUserDTO
const fieldRepository = new FieldRepository()

jest.setTimeout(30000)

beforeAll(async () => {
  user = await setupNewUser({
    AdminService,
    User,
    UserRepository,
  })
})

afterAll(async () => {
  const driver = getDriver()
  await driver.close()
})

describe('Seed data', () => {
  it('can seed data', async () => {
    await new SeedDataService().execute(user)

    const fields = await fieldRepository.find()

    console.log(fields.find((field) => Boolean(field.fieldType)))

    // await new ExportAdminDataService(
    //   path.resolve('./data/export-test'),
    // ).execute()
  })
})
