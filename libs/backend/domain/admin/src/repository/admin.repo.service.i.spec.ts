import { SeedCypressAppCommand } from '@codelab/backend/application/app'
import { initUserContext } from '@codelab/backend/test'
import type { IApp } from '@codelab/shared/abstract/core'
import { CommandBus } from '@nestjs/cqrs'

describe('AdminRepository', () => {
  const context = initUserContext({
    imports: [],
    providers: [],
  })

  let commandBus: CommandBus

  beforeAll(async () => {
    const ctx = await context
    const module = ctx.module

    commandBus = module.get(CommandBus)

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('should not clear system data during reset', async () => {
    await commandBus.execute<SeedCypressAppCommand, IApp>(
      new SeedCypressAppCommand(),
    )
  })
})
