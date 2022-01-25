import { Transaction, Transactional } from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Field } from '../domain'
import {
  CreateFieldInput,
  CreateFieldService,
} from '../use-cases/field/create-field'
import {
  DeleteFieldInput,
  DeleteFieldService,
} from '../use-cases/field/delete-field'
import { GetFieldInput, GetFieldService } from '../use-cases/field/get-field'
import {
  UpdateFieldInput,
  UpdateFieldService,
} from '../use-cases/field/update-field'

@Resolver(() => Field)
@Injectable()
export class FieldResolver {
  constructor(
    private createFieldService: CreateFieldService,
    private getFieldService: GetFieldService,
    private updateFieldService: UpdateFieldService,
    private deleteFieldService: DeleteFieldService,
  ) {}

  @Mutation(() => Field)
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async createField(
    @Args('input') input: CreateFieldInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ): Promise<Field> {
    return this.createFieldService.execute({
      input,
      currentUser,
      transaction,
    })
  }

  @Query(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async getField(
    @Args('input') input: GetFieldInput,
    @Transaction() transaction: ITransaction,
  ) {
    const field = await this.getFieldService.execute({ input, transaction })

    if (!field) {
      return null
    }

    return field
  }

  @Mutation(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async updateField(
    @Args('input') input: UpdateFieldInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updateFieldService.execute({ input, currentUser, transaction })

    const field = await this.getFieldService.execute({
      input: { byId: { fieldId: input.fieldId } },
      transaction,
    })

    if (!field) {
      throw new Error("Couldn't find updated field")
    }

    return field
  }

  @Mutation(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  @Transactional()
  async deleteField(
    @Args('input') input: DeleteFieldInput,
    @Transaction() transaction: ITransaction,
  ) {
    const field = await this.getFieldService.execute({
      input: { byId: { fieldId: input.fieldId } },
      transaction,
    })

    if (!field) {
      throw new Error("Couldn't find  field")
    }

    await this.deleteFieldService.execute({ input, transaction })

    return field
  }
}
