import { Void } from '@codelab/backend/abstract/types'
import {
  CreateResponse,
  Transaction,
  Transactional,
} from '@codelab/backend/application'
import { GqlAuthGuard, ITransaction } from '@codelab/backend/infra'
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
  @Transactional()
  async importTypes(
    @Args('input') input: ImportTypesInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    return this.importTypesService.execute({
      input,
      currentUser,
      transaction,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  @Transactional()
  async seedBaseTypes(
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.seedBaseTypesService.execute({ currentUser, transaction })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  @Transactional()
  async getType(
    @Args('input') input: GetTypeInput,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getTypeService.execute({
      input,
      transaction,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TypeGraph, { nullable: true })
  @Transactional()
  async getTypeGraph(
    @Args('input') input: GetTypeGraphInput,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getTypeGraphService.execute({ input, transaction })
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Type])
  @Transactional()
  async getTypes(
    @Args('input', { nullable: true }) input: GetTypesInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    return await this.getTypesService.execute({
      input,
      currentUser,
      transaction,
    })
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type)
  @Transactional()
  async createType(
    @Args('input') input: CreateTypeInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const { id } = await this.createTypeService.execute({
      input,
      currentUser,
      transaction,
    })

    return this.getTypeOrThrow(id, transaction)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => EnumType, { nullable: true })
  @Transactional()
  async updateEnumType(
    @Args('input') input: UpdateEnumTypeInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updateEnumTypeService.execute({
      input,
      currentUser,
      transaction,
    })

    return this.getTypeOrThrow(input.typeId, transaction)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => PrimitiveType, { nullable: true })
  @Transactional()
  async updatePrimitiveType(
    @Args('input') input: UpdatePrimitiveTypeInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updatePrimitiveTypeService.execute({
      input,
      transaction,
      currentUser,
    })

    return this.getTypeOrThrow(input.typeId, transaction)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => UnionType, { nullable: true })
  @Transactional()
  async updateUnionType(
    @Args('input') input: UpdateUnionTypeInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updateUnionTypeService.execute({
      input,
      transaction,
      currentUser,
    })

    return this.getTypeOrThrow(input.typeId, transaction)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type, { nullable: true })
  @Transactional()
  async updateType(
    @Args('input') input: UpdateTypeInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    await this.updateTypeService.execute({
      input,
      transaction,
      currentUser,
    })

    return this.getTypeOrThrow(input.typeId, transaction)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Type, { nullable: true })
  @Transactional()
  async deleteType(
    @Args('input') input: DeleteTypeInput,
    @CurrentUser() currentUser: IUser,
    @Transaction() transaction: ITransaction,
  ) {
    const type = await this.getTypeOrThrow(input.typeId, transaction)

    await this.deleteTypeService.execute({ input, currentUser, transaction })

    return type
  }

  @UseGuards(GqlAuthGuard)
  @ResolveField(() => TypeGraph)
  @Transactional()
  async typeGraph(
    @Parent() interfaceType: InterfaceType,
    @Transaction() transaction: ITransaction,
  ) {
    return this.getTypeGraphService.execute({
      input: { where: { id: interfaceType.id } },
      transaction,
    })
  }

  private async getTypeOrThrow(typeId: string, transaction: ITransaction) {
    const type = await this.getTypeService.execute({
      input: { where: { id: typeId } },
      transaction,
    })

    if (!type) {
      throw new Error("Couldn't find type")
    }

    return type
  }
}
