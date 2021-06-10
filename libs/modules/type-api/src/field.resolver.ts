import { DeleteResponse } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Field } from './models'
import {
  CreateFieldInput,
  CreateFieldService,
  GetFieldInput,
  GetFieldService,
  UpdateFieldInput,
  UpdateFieldService,
} from './use-cases'
import {
  DeleteFieldInput,
  DeleteFieldService,
} from './use-cases/field/delete-field'

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
  createField(@Args('input') input: CreateFieldInput) {
    return this.createFieldService.execute({
      input,
    })
  }

  @Query(() => Field, { nullable: true })
  getField(@Args('input') input: GetFieldInput) {
    return this.getFieldService.execute({ input })
  }

  @Mutation(() => Field)
  updateField(@Args('input') input: UpdateFieldInput) {
    return this.updateFieldService.execute({ input })
  }

  @Mutation(() => DeleteResponse)
  deleteField(@Args('input') input: DeleteFieldInput) {
    return this.deleteFieldService.execute({ input })
  }
}
