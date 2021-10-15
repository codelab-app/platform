import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse } from '@codelab/backend/application'
import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { User } from '@codelab/shared/abstract/core'
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
import { FieldAdapter } from './adapters'

@Resolver(() => Field)
@Injectable()
export class FieldResolver {
  constructor(
    private createFieldService: CreateFieldService,
    private getFieldService: GetFieldService,
    private updateFieldService: UpdateFieldService,
    private deleteFieldService: DeleteFieldService,
    private fieldMapper: FieldAdapter,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createField(
    @Args('input') input: CreateFieldInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.createFieldService.execute({
      input,
      currentUser,
    })
  }

  @Query(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getField(@Args('input') input: GetFieldInput) {
    const field = await this.getFieldService.execute({ input })

    if (!field) {
      return null
    }

    return this.fieldMapper.mapItem(field)
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  updateField(
    @Args('input') input: UpdateFieldInput,
    @CurrentUser() currentUser: User,
  ) {
    return this.updateFieldService.execute({ input, currentUser })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteField(@Args('input') input: DeleteFieldInput) {
    await this.deleteFieldService.execute({ input })
  }
}
