import { CreateResponse, GqlAuthGuard, Void } from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Field } from './models'
import {
  CreateFieldInput,
  CreateFieldService,
  DeleteFieldInput,
  DeleteFieldService,
  GetFieldInput,
  GetFieldService,
  UpdateFieldInput,
  UpdateFieldService,
} from './use-cases'

@Resolver(() => Field)
@Injectable()
export class FieldResolver {
  constructor(
    private createFieldService: CreateFieldService,
    private getFieldService: GetFieldService,
    private updateFieldService: UpdateFieldService,
    private deleteFieldService: DeleteFieldService,
  ) {}

  @Mutation(() => CreateResponse)
  @UseGuards(GqlAuthGuard)
  createField(@Args('input') input: CreateFieldInput) {
    return this.createFieldService.execute({
      input,
    })
  }

  @Query(() => Field, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getField(@Args('input') input: GetFieldInput) {
    return this.getFieldService.execute({ input })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  updateField(@Args('input') input: UpdateFieldInput) {
    return this.updateFieldService.execute({ input })
  }

  @Mutation(() => Void, { nullable: true })
  @UseGuards(GqlAuthGuard)
  async deleteField(@Args('input') input: DeleteFieldInput) {
    await this.deleteFieldService.execute({ input })
  }
}
