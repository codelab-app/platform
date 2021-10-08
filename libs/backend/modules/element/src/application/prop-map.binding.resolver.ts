import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse } from '@codelab/backend/application'
import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { PropMapBinding } from '../domain/prop-mapping/prop-map-binding.model'
import {
  CreatePropMapBindingInput,
  CreatePropMapBindingService,
} from '../use-cases/element/prop-mapping/create-prop-map-binding'
import {
  DeletePropMapBindingInput,
  DeletePropMapBindingService,
} from '../use-cases/element/prop-mapping/delete-prop-map-binding'
import {
  UpdatePropMapBindingInput,
  UpdatePropMapBindingService,
} from '../use-cases/element/prop-mapping/update-prop-map-binding'

@Resolver(() => PropMapBinding)
@Injectable()
export class PropMapBindingResolver {
  constructor(
    private createPropMapBindingService: CreatePropMapBindingService,
    private updatePropMapBindingService: UpdatePropMapBindingService,
    private deletePropMapBindingService: DeletePropMapBindingService,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createPropMapBinding(
    @Args('input') input: CreatePropMapBindingInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.createPropMapBindingService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  updatePropMapBinding(
    @Args('input') input: UpdatePropMapBindingInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.updatePropMapBindingService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  deletePropMapBinding(
    @Args('input') input: DeletePropMapBindingInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.deletePropMapBindingService.execute({ input, currentUser })
  }
}
