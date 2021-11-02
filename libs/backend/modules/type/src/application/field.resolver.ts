import { GqlAuthGuard } from '@codelab/backend/infra'
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
  async createField(
    @Args('input') input: CreateFieldInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createFieldService.execute({
      input,
      currentUser,
    })

    const field = await this.getFieldService.execute({
      input: { byId: { fieldId: id } },
    })

    if (!field) {
      throw new Error("Couldn't find created field")
    }

    return field
  }

  @Query(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async getField(@Args('input') input: GetFieldInput) {
    const field = await this.getFieldService.execute({ input })

    if (!field) {
      return null
    }

    return field
  }

  @Mutation(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async updateField(
    @Args('input') input: UpdateFieldInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateFieldService.execute({ input, currentUser })

    const field = await this.getFieldService.execute({
      input: { byId: { fieldId: input.fieldId } },
    })

    if (!field) {
      throw new Error("Couldn't find updated field")
    }

    return field
  }

  @Mutation(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteField(@Args('input') input: DeleteFieldInput) {
    const field = await this.getFieldService.execute({
      input: { byId: { fieldId: input.fieldId } },
    })

    if (!field) {
      throw new Error("Couldn't find  field")
    }

    await this.deleteFieldService.execute({ input })

    return field
  }
}
