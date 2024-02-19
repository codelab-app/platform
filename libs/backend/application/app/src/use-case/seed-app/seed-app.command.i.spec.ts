import { AppDomainModule, AppRepository } from '@codelab/backend/domain/app'
import { PageDomainModule, PageRepository } from '@codelab/backend/domain/page'
import { UserRepository } from '@codelab/backend/domain/user'
import { initUserContext } from '@codelab/backend/test'
import type { IUserDto } from '@codelab/shared/abstract/core'
import type { CommandBus } from '@nestjs/cqrs'
import { v4 } from 'uuid'
import { SeedAppCommand, SeedAppHandler } from './seed-app.command.service'

describe('SeedAppCommand', () => {
  let owner: IUserDto
  let commandBus: CommandBus
  let appRepository: AppRepository

  const context = initUserContext({
    imports: [AppDomainModule, PageDomainModule],
    providers: [SeedAppHandler, UserRepository, AppRepository, PageRepository],
  })

  beforeAll(async () => {
    const ctx = await context

    commandBus = ctx.commandBus
    appRepository = ctx.module.get(AppRepository)
    owner = ctx.owner

    await ctx.beforeAll()
  })

  afterAll(async () => {
    const ctx = await context

    await ctx.afterAll()
  })

  it('can seed an app with no', async () => {
    const page = {}

    const app = {
      id: v4(),
      name: 'Demo App',
      owner,
    }

    const command = new SeedAppCommand(app, [])

    await commandBus.execute(command)

    const foundApp = await appRepository.findOne({ id: app.id })

    expect(foundApp).toEqual(
      expect.objectContaining({
        id: app.id,
        name: app.name,
      }),
    )
  })
})
