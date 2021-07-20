import { DeleteResponse } from '@codelab/backend'
import { GqlAuthGuard } from '@codelab/backend/adapters'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { Field, Interface } from './models'
import {
  CreateFieldInput,
  CreateFieldService,
  DeleteFieldInput,
  DeleteFieldService,
  GetFieldInput,
  GetFieldService,
  GetInterfaceService,
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
    private getInterfaceService: GetInterfaceService,
  ) {}

  @Mutation(() => Field)
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

  @Mutation(() => Field)
  @UseGuards(GqlAuthGuard)
  updateField(@Args('input') input: UpdateFieldInput) {
    return this.updateFieldService.execute({ input })
  }

  @Mutation(() => DeleteResponse)
  @UseGuards(GqlAuthGuard)
  deleteField(@Args('input') input: DeleteFieldInput) {
    return this.deleteFieldService.execute({ input })
  }

  @ResolveField('interface', () => Interface)
  @UseGuards(GqlAuthGuard)
  resolveInterface(@Parent() field: Field) {
    return this.getInterfaceService.execute({
      input: { interfaceId: field.interface.id },
    })
  }
}
