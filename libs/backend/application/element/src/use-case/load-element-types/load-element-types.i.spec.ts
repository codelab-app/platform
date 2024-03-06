import { SharedApplicationModule } from '@codelab/backend/application/shared'
import { AppDomainModule, AppRepository } from '@codelab/backend/domain/app'
import { PageRepository } from '@codelab/backend/domain/page'
import { UserRepository } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test'

describe('Element types', () => {
  const context = initUserContext({
    imports: [AppDomainModule, SharedApplicationModule],
    providers: [UserRepository, AppRepository, PageRepository],
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

  it('can fetch types for an element', () => {
    //
  })
})
