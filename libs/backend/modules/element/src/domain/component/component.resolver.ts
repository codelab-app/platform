import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse } from '@codelab/backend/application'
import { CurrentUser, GqlAuthGuard } from '@codelab/backend/infra'
import type { User } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ElementTreeAdapter } from '../../application/element-tree.adapter'
import {
  CreateComponentInput,
  CreateComponentService,
} from '../../use-cases/component/create-component'
import {
  DeleteComponentInput,
  DeleteComponentService,
} from '../../use-cases/component/delete-component'
import {
  GetComponentInput,
  GetComponentService,
} from '../../use-cases/component/get-component'
import {
  GetComponentsInput,
  GetComponentsService,
} from '../../use-cases/component/get-components'
import {
  UpdateComponentInput,
  UpdateComponentService,
} from '../../use-cases/component/update-component'
import { GetElementGraphService } from '../../use-cases/element/get-element-graph'
import { ElementGraph } from '../element/element-graph.model'
import { ComponentAdapter } from './component.adapter'
import { Component } from './component.model'

@Resolver(() => Component)
@Injectable()
export class ComponentResolver {
  constructor(
    private createComponentService: CreateComponentService,
    private getComponentService: GetComponentService,
    private getComponentsService: GetComponentsService,
    private deleteComponentService: DeleteComponentService,
    private updateComponentService: UpdateComponentService,
    private componentAdapter: ComponentAdapter,
    private getElementService: GetElementGraphService,
    private elementTreeAdapter: ElementTreeAdapter,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createComponent(
    @Args('input') input: CreateComponentInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.createComponentService.execute({ input, currentUser })
  }

  @Query(() => Component, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getComponent(
    @Args('input') input: GetComponentInput,
    @CurrentUser() currentUser: User,
  ): Promise<Component | null> {
    const dgraphComponent = await this.getComponentService.execute({
      input,
      currentUser,
    })

    if (!dgraphComponent) {
      return null
    }

    return this.componentAdapter.mapItem(dgraphComponent)
  }

  @Query(() => ElementGraph, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getComponentElements(
    @Args('input') input: GetComponentInput,
    @CurrentUser() currentUser: User,
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

    return this.elementTreeAdapter.mapItem(dgraphElement)
  }

  @Query(() => [Component])
  @UseGuards(GqlAuthGuard)
  async getComponents(
    @Args('input', { nullable: true }) input?: GetComponentsInput,
  ) {
    const components = await this.getComponentsService.execute(input ?? {})

    return this.componentAdapter.map(components)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateComponent(
    @Args('input') input: UpdateComponentInput,
    @CurrentUser() currentUser: User,
  ) {
    await this.updateComponentService.execute({ input, currentUser })
  }

  @Mutation(() => Void, {
    nullable: true,
  })
  @UseGuards(GqlAuthGuard)
  async deleteComponent(
    @Args('input') input: DeleteComponentInput,
    @CurrentUser() currentUser: User,
  ) {
    await this.deleteComponentService.execute({ input, currentUser })
  }
}
