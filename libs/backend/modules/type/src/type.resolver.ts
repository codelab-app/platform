import {
  CreateResponse,
  GqlAuthGuard,
  isDgraphInterfaceType,
  Void,
} from '@codelab/backend/infra'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TypeGraphMapper, TypeMapperFactory } from './mappers'
import { Type, TypeGraph } from './models'
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
    private typeMapperFactory: TypeMapperFactory,
    private typeGraphMapper: TypeGraphMapper,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  async getType(@Args('input') input: GetTypeInput) {
    const type = await this.getTypeService.execute({
      input,
    })

    if (!type) {
      return null
    }

    const mapper = this.typeMapperFactory.getMapper(type)

    return mapper.map(type)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TypeGraph, { nullable: true })
  async getTypeGraph(@Args('input') input: GetTypeInput) {
    const type = await this.getTypeService.execute({ input })

    if (!type) {
      return null
    }

    if (isDgraphInterfaceType(type)) {
      return this.typeGraphMapper.map(type)
    }

    throw new Error('Type graph can only be retrieved for an Interface Type')
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Type])
  async getTypes(@Args('input', { nullable: true }) input: GetTypesInput) {
    const types = await this.getTypesService.execute(input || {})

    return Promise.all(
      types.map((type) =>
        this.typeMapperFactory.getMapper(type).map(type as any),
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
