import {
  ArrayMapper,
  CurrentUser,
  DgraphPage,
  GqlAuthGuard,
  JwtPayload,
} from '@codelab/backend'
import { App } from '@codelab/modules/app-api'
import { Injectable, UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { PageMapper } from './page.mapper'
import { Page } from './page.model'
import { GetPagesService } from './use-cases'

/** Resolve the pages field of App here, so that we avoid a circular dependency between page and app */
@Resolver(() => App)
@Injectable()
export class AppPagesResolver {
  private pagesMapper: ArrayMapper<DgraphPage, Page>

  constructor(
    pageMapper: PageMapper,
    private getPagesService: GetPagesService,
  ) {
    this.pagesMapper = new ArrayMapper(pageMapper)
  }

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

    return this.pagesMapper.map(pages)
  }
}
