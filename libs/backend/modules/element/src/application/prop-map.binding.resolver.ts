import { Transaction, Transactional } from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import type { IUser } from '@codelab/shared/abstract/core'
import { Inject, Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { PropMapBinding } from '../domain/prop-mapping/prop-map-binding.model'
import {
  IPropMapBindingsRepository,
  IPropMapBindingsRepositoryToken,
} from '../infrastructure/repositories/abstract/prop-map-binding-repository.interface'
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
    @Inject(IPropMapBindingsRepositoryToken)
    private readonly pmbRepository: IPropMapBindingsRepository,
    private createPropMapBindingService: CreatePropMapBindingService,
    private updatePropMapBindingService: UpdatePropMapBindingService,
    private deletePropMapBindingService: DeletePropMapBindingService,
  ) {}

  @Mutation(() => PropMapBinding)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async createPropMapBinding(
    @Args('input') input: CreatePropMapBindingInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const { id } = await this.createPropMapBindingService.execute({
      input,
      currentUser,
      transaction,
    })

    const pmb = await this.pmbRepository.getOne(id, transaction)

    if (!pmb) {
      throw new Error("Couldn't find prop map binding")
    }

    return pmb
  }

  @Mutation(() => PropMapBinding, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async updatePropMapBinding(
    @Args('input') input: UpdatePropMapBindingInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updatePropMapBindingService.execute({
      input,
      currentUser,
      transaction,
    })

    const pmb = await this.pmbRepository.getOne(
      input.propMapBindingId,
      transaction,
    )

    if (!pmb) {
      throw new Error("Couldn't find prop map binding")
    }

    return pmb
  }

  @Mutation(() => [PropMapBinding], { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async deletePropMapBinding(
    @Args('input') input: DeletePropMapBindingInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const pmbs = await this.pmbRepository.getAllByIds(
      input.propMapBindingIds,
      transaction,
    )

    if (pmbs.length !== input.propMapBindingIds.length) {
      throw new Error("Couldn't find some of the prop map bindings")
    }

    await this.deletePropMapBindingService.execute({
      input,
      currentUser,
      transaction,
    })

    return pmbs
  }
}
