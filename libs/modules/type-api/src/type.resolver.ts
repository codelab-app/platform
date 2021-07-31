import {
  CreateResponse,
  DgraphEntityType,
  DgraphInterfaceType,
  GqlAuthGuard,
  instanceOfDgraphModel,
  Void,
} from '@codelab/backend'
import { Injectable, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { TypeMapperFactory } from './mappers'
import { Type, TypeGraph } from './models'
import { TypeTreeTransformer } from './type-tree.transformer'
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
    private typeTransformer: TypeTreeTransformer,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => Type, { nullable: true })
  async getType(@Args('input') input: GetTypeInput) {
    const type = await this.getTypeService.execute({
      input,
    })

    const mapper = this.typeMapperFactory.getMapper(type)

    return mapper.map(type)
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => TypeGraph)
  async getTypeGraph(@Args('input') input: GetTypeInput) {
    const type = await this.getTypeService.execute({ input })

    if (!instanceOfDgraphModel(type, DgraphEntityType.InterfaceType)) {
      throw new Error('Type graph can only be retrieved for an Interface Type')
    }

    return this.typeTransformer.toGraph(type as DgraphInterfaceType)
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
  createType(@Args('input') input: CreateTypeInput) {
    return this.createTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  updateEnumType(@Args('input') input: UpdateEnumTypeInput) {
    return this.updateEnumTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  updatePrimitiveType(@Args('input') input: UpdatePrimitiveTypeInput) {
    return this.updatePrimitiveTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  updateType(@Args('input') input: UpdateTypeInput) {
    return this.updateTypeService.execute(input)
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Void, { nullable: true })
  deleteType(@Args('input') input: DeleteTypeInput) {
    return this.deleteTypeService.execute(input)
  }
}
