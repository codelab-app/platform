import { UserDomainModule } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test'
import { v4 } from 'uuid'

describe('Tag repository.', () => {
  const context = initUserContext({
    imports: [UserDomainModule],
    providers: [],
  })

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should work', () => {
    expect(true).toBeTruthy()
  })
})
