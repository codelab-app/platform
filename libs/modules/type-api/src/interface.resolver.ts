import { DeleteResponse } from '@codelab/backend'
import { GqlAuthGuard } from '@codelab/modules/auth-api'
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
  FieldCollection,
  fieldCollectionSchema,
  Interface,
  InterfaceMapper,
} from './models'
import {
  CreateInterfaceInput,
  CreateInterfaceService,
  DeleteInterfaceInput,
  DeleteInterfaceService,
  GetInterfaceInput,
  GetInterfaceService,
  GetInterfacesService,
  GetRecursiveInterfaceService,
  UpdateInterfaceInput,
  UpdateInterfaceService,
} from './use-cases'

@Resolver(() => Interface)
@Injectable()
export class InterfaceResolver {
  constructor(
    private getInterfaceService: GetInterfaceService,
    private getInterfacesService: GetInterfacesService,
    private interfaceMapper: InterfaceMapper,
    private getRecursiveInterfaceService: GetRecursiveInterfaceService,
    private createInterfaceService: CreateInterfaceService,
    private updateInterfaceService: UpdateInterfaceService,
    private deleteInterfaceService: DeleteInterfaceService,
  ) {}

  @Query(() => Interface, { nullable: true })
  @UseGuards(GqlAuthGuard)
  getInterface(@Args('input') input: GetInterfaceInput) {
    return this.getInterfaceService.execute({
      input,
    })
  }

  @Query(() => [Interface])
  @UseGuards(GqlAuthGuard)
  getInterfaces() {
    return this.getInterfacesService.execute({})
  }

  @Mutation(() => Interface)
  @UseGuards(GqlAuthGuard)
  createInterface(@Args('input') input: CreateInterfaceInput) {
    return this.createInterfaceService.execute({
      input,
    })
  }

  @Mutation(() => Interface)
  @UseGuards(GqlAuthGuard)
  updateInterface(@Args('input') input: UpdateInterfaceInput) {
    return this.updateInterfaceService.execute({
      input,
    })
  }

  @Mutation(() => DeleteResponse)
  @UseGuards(GqlAuthGuard)
  deleteInterface(@Args('input') input: DeleteInterfaceInput) {
    return this.deleteInterfaceService.execute({ input })
  }

  @ResolveField('fieldCollection', () => FieldCollection)
  @UseGuards(GqlAuthGuard)
  async resolveFieldCollection(@Parent() parentInterface: Interface) {
    const recursiveInterface = await this.getRecursiveInterfaceService.execute({
      input: { interfaceId: parentInterface.id },
    })

    if (!recursiveInterface) {
      throw new Error('Interface not found')
    }

    const mapped = await this.interfaceMapper.map(recursiveInterface)

    fieldCollectionSchema.parse(mapped.fieldCollection) // do not return the parsed response, because it doesn't perserve the classes

    return mapped.fieldCollection
  }
}
