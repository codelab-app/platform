import { CurrentUser, GqlAuthGuard, JwtPayload } from '@codelab/backend/infra'
import { App } from '@codelab/backend/modules/app'
import { Injectable, UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { PageAdapter } from './page.adapter'
import { GetPagesService } from './use-cases'

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
  async resolvePages(
    @Parent() parent: App,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    const pages = await this.getPagesService.execute({
      input: { byApp: { appId: parent.id } },
      currentUser,
    })

    return this.pageMapper.map(pages)
  }
}
