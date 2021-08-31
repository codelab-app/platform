import {
  CreateResponse,
  GqlAuthGuard,
  isDgraphInterfaceType,
  Void,
} from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { InterfaceType, Type, TypeGraph } from '../domain'
import {
  CreateTypeInput,
  CreateTypeService,
} from '../use-cases/type/create-type'
import {
  DeleteTypeInput,
  DeleteTypeService,
} from '../use-cases/type/delete-type'
import { GetTypeInput, GetTypeService } from '../use-cases/type/get-type'
import { GetTypesInput, GetTypesService } from '../use-cases/type/get-types'
import { ImportApiService } from '../use-cases/type/import-api'
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
import { TypeAdapterFactory, TypeGraphAdapter } from './adapters'

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
    private typeAdapterFactory: TypeAdapterFactory,
    private typeGraphAdapter: TypeGraphAdapter,
    private seedBaseTypesService: SeedBaseTypesService,
    private importApiService: ImportApiService,
  ) {}

  /**
   * Used by export to resolve the graph on the type
   * @param api
   */
  @ResolveField('typeGraph', () => TypeGraph)
  async typeGraph(@Parent() api: InterfaceType) {
    const { id } = api
    const type = await this.getTypeService.execute({ input: { where: { id } } })

    if (!type) {
      return null
    }

    if (isDgraphInterfaceType(type)) {
      return this.typeGraphAdapter.mapItem(type)
    }

    throw new Error('Type graph can only be retrieved for an Interface Type')
  }

  // @UseGuards(GqlAuthGuard)
  // @Mutation(() => Void, { nullable: true })
  // async importApi(@Args('input') input: ImportApiInput) {
  //   await this.importApiService.execute(input)
  // }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  async seedBaseTypes() {
    this.seedBaseTypesService.execute()
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  async getType(@Args('input') input: GetTypeInput) {
    const type = await this.getTypeService.execute({
      input,
    })

    if (!type) {
      return null
    }

    return this.typeAdapterFactory.getMapper(type).mapItem(type)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TypeGraph, { nullable: true })
  async getTypeGraph(@Args('input') input: GetTypeInput) {
    const type = await this.getTypeService.execute({ input })

    if (!type) {
      return null
    }

    if (isDgraphInterfaceType(type)) {
      return this.typeGraphAdapter.mapItem(type)
    }

    throw new Error('Type graph can only be retrieved for an Interface Type')
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Type])
  async getTypes(@Args('input', { nullable: true }) input: GetTypesInput) {
    const types = await this.getTypesService.execute(input || {})

    return Promise.all(
      types.map((type) =>
        this.typeAdapterFactory.getMapper(type).mapItem(type),
      ),
    )
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => CreateResponse)
  async createType(@Args('input') input: CreateTypeInput) {
    return await this.createTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  async updateEnumType(@Args('input') input: UpdateEnumTypeInput) {
    await this.updateEnumTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  async updatePrimitiveType(@Args('input') input: UpdatePrimitiveTypeInput) {
    await this.updatePrimitiveTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  async updateType(@Args('input') input: UpdateTypeInput) {
    await this.updateTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  async deleteType(@Args('input') input: DeleteTypeInput) {
    await this.deleteTypeService.execute(input)
  }
}
