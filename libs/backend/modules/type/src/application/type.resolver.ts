import { Void } from '@codelab/backend/abstract/types'
import { CreateResponse, Transactional } from '@codelab/backend/application'
import { GqlAuthGuard } from '@codelab/backend/infra'
import { CurrentUser } from '@codelab/backend/modules/user'
import { IUser } from '@codelab/shared/abstract/core'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import {
  EnumType,
  InterfaceType,
  PrimitiveType,
  Type,
  TypeGraph,
  UnionType,
} from '../domain'
import {
  CreateTypeInput,
  CreateTypeService,
} from '../use-cases/type/create-type'
import {
  DeleteTypeInput,
  DeleteTypeService,
} from '../use-cases/type/delete-type'
import { GetTypeInput, GetTypeService } from '../use-cases/type/get-type'
import {
  GetTypeGraphInput,
  GetTypeGraphService,
} from '../use-cases/type/get-type-graph'
import { GetTypesInput, GetTypesService } from '../use-cases/type/get-types'
import { ImportTypesInput } from '../use-cases/type/import-types/import-types.input'
import { ImportTypesService } from '../use-cases/type/import-types/import-types.service'
import { SeedBaseTypesService } from '../use-cases/type/seed-base-types'
import {
  UpdateEnumTypeInput,
  UpdateEnumTypeService,
} from '../use-cases/type/update-enum-type'
import {
  UpdatePrimitiveTypeInput,
  UpdatePrimitiveTypeService,
} from '../use-cases/type/update-primitive-type'
import {
  UpdateTypeInput,
  UpdateTypeService,
} from '../use-cases/type/update-type'
import {
  UpdateUnionTypeInput,
  UpdateUnionTypeService,
} from '../use-cases/type/update-union-type/'

@Resolver(() => Type)
@Injectable()
export class TypeResolver {
  constructor(
    private getTypeService: GetTypeService,
    private getTypesService: GetTypesService,
    private updateEnumTypeService: UpdateEnumTypeService,
    private updateUnionTypeService: UpdateUnionTypeService,
    private updatePrimitiveTypeService: UpdatePrimitiveTypeService,
    private updateTypeService: UpdateTypeService,
    private createTypeService: CreateTypeService,
    private deleteTypeService: DeleteTypeService,
    private seedBaseTypesService: SeedBaseTypesService,
    private getTypeGraphService: GetTypeGraphService,
    private importTypesService: ImportTypesService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => [CreateResponse], { nullable: true })
  async importTypes(
    @Args('input') input: ImportTypesInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.importTypesService.execute({
      input,
      currentUser,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  async seedBaseTypes(@CurrentUser() currentUser: IUser) {
    await this.seedBaseTypesService.execute({ currentUser })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  async getType(@Args('input') input: GetTypeInput) {
    return this.getTypeService.execute({
      input,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TypeGraph, { nullable: true })
  async getTypeGraph(@Args('input') input: GetTypeGraphInput) {
    return this.getTypeGraphService.execute({ input })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Type])
  async getTypes(
    @Args('input', { nullable: true }) input: GetTypesInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return await this.getTypesService.execute({
      input,
      currentUser,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type)
  async createType(
    @Args('input') input: CreateTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createTypeService.execute({
      input,
      currentUser,
    })

    return this.getTypeOrThrow(id)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EnumType, { nullable: true })
  async updateEnumType(
    @Args('input') input: UpdateEnumTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateEnumTypeService.execute({
      input,
      currentUser,
    })

    return this.getTypeOrThrow(input.typeId)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PrimitiveType, { nullable: true })
  async updatePrimitiveType(
    @Args('input') input: UpdatePrimitiveTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updatePrimitiveTypeService.execute({
      input,
      currentUser,
    })

    return this.getTypeOrThrow(input.typeId)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UnionType, { nullable: true })
  @Transactional()
  async updateUnionType(
    @Args('input') input: UpdateUnionTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateUnionTypeService.execute({
      input,
      currentUser,
    })

    return this.getTypeOrThrow(input.typeId)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type, { nullable: true })
  async updateType(
    @Args('input') input: UpdateTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateTypeService.execute({
      input,
      currentUser,
    })

    return this.getTypeOrThrow(input.typeId)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type, { nullable: true })
  async deleteType(
    @Args('input') input: DeleteTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const type = await this.getTypeOrThrow(input.typeId)

    await this.deleteTypeService.execute({ input, currentUser })

    return type
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => TypeGraph)
  async typeGraph(@Parent() interfaceType: InterfaceType) {
    return this.getTypeGraphService.execute({
      input: { where: { id: interfaceType.id } },
    })
  }

  private async getTypeOrThrow(typeId: string) {
    const type = await this.getTypeService.execute({
      input: { where: { id: typeId } },
    })

    if (!type) {
      throw new Error("Couldn't find type")
    }

    return type
  }
}
