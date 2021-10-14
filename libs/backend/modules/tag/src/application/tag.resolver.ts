import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse } from '@codelab/backend/application'
import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Tag } from '../domain/tag.model'
import { TagGraph } from '../domain/tag-graph.model'
import { CreateTagInput, CreateTagService } from '../use-cases/create-tag'
import { DeleteTagsInput, DeleteTagsService } from '../use-cases/delete-tags'
import { GetTagInput, GetTagService } from '../use-cases/get-tag'
import { GetTagGraphService } from '../use-cases/get-tag-graph'
import {
  GetTagGraphsInput,
  GetTagGraphsService,
} from '../use-cases/get-tag-graphs'
import { GetTagsService } from '../use-cases/get-tags'
import { ImportTagsInput, ImportTagsService } from '../use-cases/import-tags'
import { UpdateTagInput, UpdateTagService } from '../use-cases/update-tag'
import { UpsertTagInput, UpsertTagService } from '../use-cases/upsert-tag'
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
    private readonly getTagGraphsService: GetTagGraphsService,
    private readonly getTagsService: GetTagsService,
    private readonly tagTreeAdapter: DgraphTagAdapter,
    private readonly importTagsService: ImportTagsService,
    private readonly upsertTagService: UpsertTagService,
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

  @Mutation(() => Void)
  @UseGuards(GqlAuthGuard)
  async upsertTag(
    @Args('input') input: UpsertTagInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.upsertTagService.execute({ input, currentUser })
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

  @Query(() => TagGraph, {
    defaultValue: { vertices: [], edges: [] },
    description:
      'Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge',
  })
  @UseGuards(GqlAuthGuard)
  async getTagGraphs(
    @CurrentUser() currentUser: User,
    @Args('input', { nullable: true }) input?: GetTagGraphsInput,
  ) {
    const tagGraph = await this.getTagGraphsService.execute({
      input,
      currentUser,
    })

    if (!tagGraph) {
      return []
    }

    return new TagGraph(tagGraph)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async importTags(
    @Args('input') input: ImportTagsInput,
    @CurrentUser() currentUser: User,
  ) {
    return await this.importTagsService.execute({ input, currentUser })
  }
}
