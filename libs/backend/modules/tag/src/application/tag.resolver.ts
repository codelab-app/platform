import { Void } from '@codelab/backend/abstract/types'
import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Maybe } from 'graphql/jsutils/Maybe'
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
import { GetTagsInput, GetTagsService } from '../use-cases/get-tags'
import { ImportTagsInput, ImportTagsService } from '../use-cases/import-tags'
import { UpdateTagInput, UpdateTagService } from '../use-cases/update-tag'
import { UpsertTagInput, UpsertTagService } from '../use-cases/upsert-tag'

@Resolver(() => Tag)
@Injectable()
export class TagResolver {
  constructor(
    private readonly getTagService: GetTagService,
    private readonly createTagService: CreateTagService,
    private readonly deleteTagsService: DeleteTagsService,
    private readonly updateTagService: UpdateTagService,
    private readonly getTagGraphService: GetTagGraphService,
    private readonly getTagGraphsService: GetTagGraphsService,
    private readonly getTagsService: GetTagsService,
    private readonly importTagsService: ImportTagsService,
    private readonly upsertTagService: UpsertTagService,
  ) {}

  @Mutation(() => Tag)
  @UseGuards(GqlAuthGuard)
  async createTag(
    @Args('input') input: CreateTagInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createTagService.execute({ input, currentUser })
    const tag = await this.getTagService.execute({ where: { id } })

    if (!tag) {
      throw new Error("Couldn't find created tag")
    }

    return tag
  }

  @Query(() => Tag, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getTag(@CurrentUser() user: IUser, @Args('input') input: GetTagInput) {
    return this.getTagService.execute(input)
  }

  @Query(() => [Tag], {
    description: 'Get all Tag graphs',
  })
  @UseGuards(GqlAuthGuard)
  async getTags(
    @Args('input', { nullable: true, type: () => GetTagsInput })
    input: Maybe<GetTagsInput>,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getTagsService.execute({ currentUser })
  }

  @Mutation(() => Tag, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateTag(@Args('input') input: UpdateTagInput) {
    await this.updateTagService.execute({ input })

    const tag = await this.getTagService.execute({ where: { id: input.id } })

    if (!tag) {
      throw new Error("Couldn't find tag")
    }

    return tag
  }

  @Mutation(() => [Tag], { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteTags(
    @Args('input') input: DeleteTagsInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const tags = await this.getTagsService.execute({
      input: { ids: input.ids },
      currentUser,
    })

    if (!tags?.length) {
      throw new Error("Couldn't find tag")
    }

    await this.deleteTagsService.execute({ input })

    return tags
  }

  @Mutation(() => Tag)
  @UseGuards(GqlAuthGuard)
  async upsertTag(
    @Args('input') input: UpsertTagInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.upsertTagService.execute({ input, currentUser })

    const tag = await this.getTagService.execute({
      where: { id: input.where?.id },
    })

    if (!tag) {
      throw new Error("Couldn't find tag")
    }

    return tag
  }

  @Query(() => TagGraph, {
    nullable: true,
    description:
      'Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge',
  })
  @UseGuards(GqlAuthGuard)
  async getTagGraph(@CurrentUser() currentUser: IUser) {
    const tagGraph = await this.getTagGraphService.execute({
      currentUser,
    })

    if (!tagGraph) {
      return null
    }

    return new TagGraph(tagGraph)
  }

  @Query(() => TagGraph, {
    defaultValue: { vertices: [], edges: [] },
    description:
      'Aggregates the requested tags and all of its descendant tags (infinitely deep) in the form of a flat array of TagVertex (alias of Tag) and array of TagEdge',
  })
  @UseGuards(GqlAuthGuard)
  async getTagGraphs(
    @CurrentUser() currentUser: IUser,
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
    @CurrentUser() currentUser: IUser,
  ) {
    return await this.importTagsService.execute({ input, currentUser })
  }
}
