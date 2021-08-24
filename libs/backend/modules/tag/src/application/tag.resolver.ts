import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  Void,
} from '@codelab/backend/infra'
import { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Tag } from '../domain/tag.model'
import { TagGraph } from '../domain/tag-graph.model'
import { CreateTagInput, CreateTagService } from '../use-cases/create-tag'
import { DeleteTagsInput, DeleteTagsService } from '../use-cases/delete-tags'
import { GetTagInput, GetTagService } from '../use-cases/get-tag'
import { GetTagGraphService } from '../use-cases/get-tag-graph'
import { GetTagsService } from '../use-cases/get-tags'
import { UpdateTagInput, UpdateTagService } from '../use-cases/update-tag'
import { DgraphTagAdapter } from './dgraph-tag.adapter'
import { TagAdapter } from './tag.adapter'

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
    private readonly tagTreeAdapter: DgraphTagAdapter,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  async createTag(
    @Args('input') input: CreateTagInput,
    @CurrentUser() currentUser: User,
  ) {
    return await this.createTagService.execute({ input, currentUser })
  }

  @Query(() => Tag, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getTag(@CurrentUser() user: User, @Args('input') input: GetTagInput) {
    const tag = await this.getTagService.execute(input)

    if (!tag) {
      return null
    }

    return this.tagAdapter.mapItem(tag)
  }

  @Query(() => [Tag], {
    description: 'Get all Tag graphs',
  })
  @UseGuards(GqlAuthGuard)
  async getTags(@CurrentUser() currentUser: User) {
    const tags = await this.getTagsService.execute({ currentUser })

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
  async getTagGraph(@CurrentUser() currentUser: User) {
    const dgraphTagTree = await this.getTagGraphService.execute({
      currentUser,
    })

    if (!dgraphTagTree) {
      return null
    }

    return this.tagTreeAdapter.mapItem(dgraphTagTree.root)
  }
}
