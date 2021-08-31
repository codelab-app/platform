import { CurrentUser, GqlAuthGuard } from '@codelab/backend/infra'
import { App } from '@codelab/backend/modules/app'
import type { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { GetPagesService } from '../use-cases/get-pages'
import { PageAdapter } from './page.adapter'

/** Resolve the pages field of App here, so that we avoid a circular dependency between page and app */
@Resolver(() => App)
@Injectable()
export class AppPagesResolver {
  constructor(
    private readonly pageMapper: PageAdapter,
    private readonly getPagesService: GetPagesService,
  ) {}

  @ResolveField('pages', () => App)
  @UseGuards(GqlAuthGuard)
  async resolvePages(@Parent() parent: App, @CurrentUser() currentUser: User) {
    const pages = await this.getPagesService.execute({
      input: { byApp: { appId: parent.id } },
      currentUser,
    })

    return this.pageMapper.map(pages)
  }
}
