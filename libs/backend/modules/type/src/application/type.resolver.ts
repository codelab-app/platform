import { Void } from '@codelab/backend/abstract/types'
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
  ) {}

  // @UseGuards(GqlAuthGuard)
  // @Mutation(() => Void, { nullable: true })
  // async importApi(@Args('input') input: ImportApiInput) {
  //   await this.importApiService.execute(input)
  // }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  async seedBaseTypes(@CurrentUser() currentUser: IUser) {
    await this.seedBaseTypesService.execute({ currentUser })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  async getType(
    @Args('input') input: GetTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getTypeService.execute({
      input,
      currentUser,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TypeGraph, { nullable: true })
  async getTypeGraph(
    @Args('input') input: GetTypeGraphInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getTypeGraphService.execute({ input, currentUser })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Type])
  async getTypes(
    @Args('input', { nullable: true }) input: GetTypesInput,
    @CurrentUser() currentUser: IUser,
  ) {
    return await this.getTypesService.execute({ input, currentUser })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type)
  async createType(
    @Args('input') input: CreateTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    const { id } = await this.createTypeService.execute({ input, currentUser })

    return this.getTypeOrThrow(id, currentUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EnumType, { nullable: true })
  async updateEnumType(
    @Args('input') input: UpdateEnumTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateEnumTypeService.execute(input)

    return this.getTypeOrThrow(input.typeId, currentUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PrimitiveType, { nullable: true })
  async updatePrimitiveType(
    @Args('input') input: UpdatePrimitiveTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updatePrimitiveTypeService.execute(input)

    return this.getTypeOrThrow(input.typeId, currentUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UnionType, { nullable: true })
  async updateUnionType(
    @Args('input') input: UpdateUnionTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateUnionTypeService.execute(input)

    return this.getTypeOrThrow(input.typeId, currentUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type, { nullable: true })
  async updateType(
    @Args('input') input: UpdateTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.updateTypeService.execute(input)

    return this.getTypeOrThrow(input.typeId, currentUser)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type, { nullable: true })
  async deleteType(
    @Args('input') input: DeleteTypeInput,
    @CurrentUser() currentUser: IUser,
  ) {
    await this.deleteTypeService.execute(input)

    return this.getTypeOrThrow(input.typeId, currentUser)
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => TypeGraph)
  async typeGraph(
    @Parent() interfaceType: InterfaceType,
    @CurrentUser() currentUser: IUser,
  ) {
    return this.getTypeGraphService.execute({
      input: {
        where: { id: interfaceType.id },
      },
      currentUser,
    })
  }

  private async getTypeOrThrow(typeId: string, currentUser: IUser) {
    const type = await this.getTypeService.execute({
      input: { where: { id: typeId } },
      currentUser,
    })

    if (!type) {
      throw new Error("Couldn't find type")
    }

    return type
  }
}
