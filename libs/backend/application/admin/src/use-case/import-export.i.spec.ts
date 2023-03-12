import type { IUser } from '@codelab/backend/abstract/core'
import { AdminService } from '@codelab/backend/domain/admin'
import { User, UserRepository } from '@codelab/backend/domain/user'
import { setupUser } from '@codelab/backend/shared/util'

let user: IUser

beforeAll(async () => {
  user = await setupUser({
    AdminService,
    UserRepository,
    User,
  })
})

// describe('Import data', () => { it('can import data', async () => {

//   })
// })
