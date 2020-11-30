import { Query, Resolver } from '@nestjs/graphql'
import { PageEntity } from './page.entity'
import { PageService } from './page.service'

@Resolver(() => PageEntity)
export class PageResolver {
  constructor(private pageService: PageService) {}

  @Query(() => [PageEntity])
  async getAllPages() {
    return this.pageService.findAll()
  }
}
