import { GqlAuthGuard } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { PageElement, PageElementRoot } from './models'
import { CreatePageElementInput, CreatePageElementService } from './use-cases'

@Resolver(() => PageElementRoot)
@Injectable()
export class PageElementResolver {
  constructor(private createPageElementService: CreatePageElementService) {}

  //TODO page owner auth guard?
  @Mutation(() => PageElement)
  @UseGuards(GqlAuthGuard)
  createPageElement(@Args('input') input: CreatePageElementInput) {
    return this.createPageElementService.execute(input)
  }
}
