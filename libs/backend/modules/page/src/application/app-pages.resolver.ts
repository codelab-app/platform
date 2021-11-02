import { GqlAuthGuard } from '@codelab/backend/infra'
import { App } from '@codelab/backend/modules/app'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Page } from '../domain/page.model'
import { GetPagesService } from '../use-cases/get-pages'

/** Resolve the pages field of App here, so that we avoid a circular dependency between page and app */
@Resolver(() => App)
@Injectable()
export class AppPagesResolver {
  constructor(private readonly getPagesService: GetPagesService) {}

  @ResolveField('pages', () => [Page])
  @UseGuards(GqlAuthGuard)
  async resolvePages(@Parent() parent: App, @CurrentUser() currentUser: IUser) {
    return this.getPagesService.execute({
      input: { byApp: { appId: parent.id } },
      currentUser,
    })
  }
}
