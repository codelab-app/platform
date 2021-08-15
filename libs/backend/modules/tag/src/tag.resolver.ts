import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
  Void,
} from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Tag, TagGraph } from './models'
import { TagAdapter } from './tag.adapter'
import { CreateTagInput, CreateTagService } from './use-cases/create-tag'
import { DeleteTagsInput, DeleteTagsService } from './use-cases/delete-tags'
import { GetTagInput, GetTagService } from './use-cases/get-tag'
import { GetTagGraphInput, GetTagGraphService } from './use-cases/get-tag-graph'
import { GetTagsService } from './use-cases/get-tags'
import { UpdateTagInput, UpdateTagService } from './use-cases/update-tag'

@Resolver(() => Tag)
@Injectable()
export class TagResolver {
  constructor(
    private readonly tagAdapter: TagAdapter,
    private readonly getTagService: GetTagService,
    private readonly createTagService: CreateTagService,
    private readonly deleteTagsService: DeleteTagsService,
    private readonly updateTagService: UpdateTagService,
    private readonly getTagGraphService: GetTagGraphService,
    private readonly getTagsService: GetTagsService,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  async createTag(
    @Args('input') input: CreateTagInput,
    @CurrentUser() owner: JwtPayload,
  ) {
    return await this.createTagService.execute({ input, owner })
  }

  @Query(() => Tag)
  @UseGuards(GqlAuthGuard)
  async getTag(
    @CurrentUser() user: JwtPayload,
    @Args('input') input: GetTagInput,
  ) {
    const tag = await this.getTagService.execute(input)

    return this.tagAdapter.map(tag)
  }

  @Query(() => [Tag], {
    description: 'Get all Tag graphs',
  })
  @UseGuards(GqlAuthGuard)
  async getTags(@CurrentUser() user: JwtPayload) {
    const tags = await this.getTagsService.execute({ owner: user })

    return this.tagAdapter.map(tags)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  updateTag(@Args('input') input: UpdateTagInput) {
    return this.updateTagService.execute({ input })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  deleteTags(@Args('input') input: DeleteTagsInput) {
    return this.deleteTagsService.execute({ input })
  }

  @Query(() => TagGraph, {
    nullable: true,
    description:
      'Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge',
  })
  @UseGuards(GqlAuthGuard)
  async getTagGraph(@Args('input') input: GetTagGraphInput) {
    //
  }
}
