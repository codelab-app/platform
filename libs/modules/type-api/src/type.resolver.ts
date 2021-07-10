import { DeleteResponse } from '@codelab/backend'
import { GqlAuthGuard } from '@codelab/modules/auth-api'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { EnumType, PrimitiveType, Type } from './models'
import {
  CreateTypeInput,
  CreateTypeService,
  DeleteTypeInput,
  DeleteTypeService,
  GetTypeInput,
  GetTypeService,
  GetTypesInput,
  GetTypesService,
  UpdateEnumTypeInput,
  UpdateEnumTypeService,
  UpdatePrimitiveTypeInput,
  UpdatePrimitiveTypeService,
  UpdateTypeInput,
  UpdateTypeService,
} from './use-cases'

@Resolver(() => Type)
@Injectable()
export class TypeResolver {
  constructor(
    private getTypeService: GetTypeService,
    private getTypesService: GetTypesService,
    private updateEnumTypeService: UpdateEnumTypeService,
    private updatePrimitiveTypeService: UpdatePrimitiveTypeService,
    private updateTypeService: UpdateTypeService,
    private createTypeService: CreateTypeService,
    private deleteTypeService: DeleteTypeService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  getType(@Args('input') input: GetTypeInput) {
    return this.getTypeService.execute({
      input,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Type])
  getTypes(@Args('input', { nullable: true }) input: GetTypesInput) {
    return this.getTypesService.execute(input || {})
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type)
  createType(@Args('input') input: CreateTypeInput) {
    return this.createTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EnumType)
  updateEnumType(@Args('input') input: UpdateEnumTypeInput) {
    return this.updateEnumTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PrimitiveType)
  updatePrimitiveType(@Args('input') input: UpdatePrimitiveTypeInput) {
    return this.updatePrimitiveTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type)
  updateType(@Args('input') input: UpdateTypeInput) {
    return this.updateTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => DeleteResponse)
  deleteType(@Args('input') input: DeleteTypeInput) {
    return this.deleteTypeService.execute(input)
  }
}
