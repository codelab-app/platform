import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
  Void,
} from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TagGraph } from './models'
import { Tag } from './models/tag.model'
import { TagMapper } from './tag.mapper'
import { CreateTagInput, CreateTagService } from './use-cases/create-tag'
import { DeleteTagInput, DeleteTagService } from './use-cases/delete-tag'
import { GetTagInput, GetTagTreeService } from './use-cases/get-tag-tree'
import { GetTagsService } from './use-cases/get-tags'
import { UpdateTagInput, UpdateTagService } from './use-cases/update-tag'

@Resolver(() => Tag)
@Injectable()
export class TagResolver {
  constructor(
    private readonly tagMapper: TagMapper,
    private readonly createTagService: CreateTagService,
    private readonly deleteTagService: DeleteTagService,
    private readonly updateTagService: UpdateTagService,
    private readonly getTagService: GetTagTreeService,
    private readonly getTagsService: GetTagsService,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createTag(
    @Args('input') input: CreateTagInput,
    @CurrentUser() owner: JwtPayload,
  ) {
    return this.createTagService.execute({ input, owner })
  }

  @Query(() => Tag)
  @UseGuards(GqlAuthGuard)
  async getTag(
    @CurrentUser() user: JwtPayload,
    @Args('input') input: GetTagInput,
  ) {
    const tag = await this.getTagService.execute({ owner: user, input })

    return this.tagMapper.map(tag)
  }

  @Query(() => [Tag])
  @UseGuards(GqlAuthGuard)
  async getTags(@CurrentUser() user: JwtPayload) {
    const tags = await this.getTagsService.execute({ owner: user })

    return tags.map((tag) => this.tagMapper.map(tag))
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  updateTag(@Args('input') input: UpdateTagInput) {
    return this.updateTagService.execute({ input })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  deleteTag(@Args('input') input: DeleteTagInput) {
    return this.deleteTagService.execute({ input })
  }

  @Query(() => TagGraph, {
    nullable: true,
    description:
      'Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge',
  })
  @UseGuards(GqlAuthGuard)
  async getTagGraph(@Args('input') input: GetTagInput) {
    //
  }
}
