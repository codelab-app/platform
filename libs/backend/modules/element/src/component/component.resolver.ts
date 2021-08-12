import {
  CreateResponse,
  CurrentUser,
  GqlAuthGuard,
  JwtPayload,
  Void,
} from '@codelab/backend/infra'
import { ArrayMapper } from '@codelab/shared/utils'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ElementTreeTransformer } from '../element-tree.transformer'
import { ElementGraph } from '../models'
import { GetElementGraphService } from '../use-cases'
import { ComponentMapper } from './component.mapper'
import { Component } from './component.model'
import {
  CreateComponentInput,
  CreateComponentService,
  DeleteComponentInput,
  DeleteComponentService,
  GetComponentInput,
  GetComponentService,
  GetComponentsService,
  UpdateComponentInput,
  UpdateComponentService,
} from './use-cases'

@Resolver(() => Component)
@Injectable()
export class ComponentResolver {
  constructor(
    private createComponentService: CreateComponentService,
    private getComponentService: GetComponentService,
    private getComponentsService: GetComponentsService,
    private deleteComponentService: DeleteComponentService,
    private updateComponentService: UpdateComponentService,
    private componentMapper: ComponentMapper,
    private getElementService: GetElementGraphService,
    private elementTreeTransformer: ElementTreeTransformer,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createComponent(
    @Args('input') input: CreateComponentInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    return this.createComponentService.execute({ input, currentUser })
  }

  @Query(() => Component, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getComponent(
    @Args('input') input: GetComponentInput,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<Component | null> {
    const dgraphComponent = await this.getComponentService.execute({
      input,
      currentUser,
    })

    if (!dgraphComponent) {
      return null
    }

    return this.componentMapper.map(dgraphComponent)
  }

  @Query(() => ElementGraph, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getComponentElements(
    @Args('input') input: GetComponentInput,
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<ElementGraph | null> {
    const dgraphComponent = await this.getComponentService.execute({
      input,
      currentUser,
    })

    if (!dgraphComponent) {
      return null
    }

    const dgraphElement = await this.getElementService.execute({
      input: { elementId: dgraphComponent.root.uid },
      currentUser,
    })

    if (!dgraphElement) {
      return null
    }

    return this.elementTreeTransformer.transform(dgraphElement)
  }

  @Query(() => [Component])
  @UseGuards(GqlAuthGuard)
  async getComponents() {
    const dgraphComponents = await this.getComponentsService.execute({})

    return new ArrayMapper(this.componentMapper).map(dgraphComponents)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateComponent(
    @Args('input') input: UpdateComponentInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.updateComponentService.execute({ input, currentUser })
  }

  @Mutation(() => Void, {
    nullable: true,
  })
  @UseGuards(GqlAuthGuard)
  async deleteComponent(
    @Args('input') input: DeleteComponentInput,
    @CurrentUser() currentUser: JwtPayload,
  ) {
    await this.deleteComponentService.execute({ input, currentUser })
  }
}
