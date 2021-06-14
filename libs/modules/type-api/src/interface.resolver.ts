import { DeleteResponse } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
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
  GetRecursiveInterfaceService,
  UpdateInterfaceInput,
  UpdateInterfaceService,
} from './use-cases'

@Resolver(() => Interface)
@Injectable()
export class InterfaceResolver {
  constructor(
    private getInterfaceService: GetInterfaceService,
    private interfaceMapper: InterfaceMapper,
    private getRecursiveInterfaceService: GetRecursiveInterfaceService,
    private createInterfaceService: CreateInterfaceService,
    private updateInterfaceService: UpdateInterfaceService,
    private deleteInterfaceService: DeleteInterfaceService,
  ) {}

  @Query(() => Interface, { nullable: true })
  getInterface(@Args('input') input: GetInterfaceInput) {
    return this.getInterfaceService.execute({
      input,
    })
  }

  @Mutation(() => Interface)
  createInterface(@Args('input') input: CreateInterfaceInput) {
    return this.createInterfaceService.execute({
      input,
    })
  }

  @Mutation(() => Interface)
  updateInterface(@Args('input') input: UpdateInterfaceInput) {
    return this.updateInterfaceService.execute({
      input,
    })
  }

  @Mutation(() => DeleteResponse)
  deleteInterface(@Args('input') input: DeleteInterfaceInput) {
    return this.deleteInterfaceService.execute({ input })
  }

  @ResolveField('fieldCollection', () => FieldCollection)
  async resolveFieldCollection(@Parent() parentInterface: Interface) {
    const recursiveInterface = await this.getRecursiveInterfaceService.execute({
      input: { interfaceId: parentInterface.id },
    })

    if (!recursiveInterface) {
      throw new Error('Interface not found')
    }

    const mapped = await this.interfaceMapper.map(recursiveInterface)

    fieldCollectionSchema.parse(mapped.fieldCollection) //do not return the parsed response, because it doesn't perserve the classes

    return mapped.fieldCollection
  }
}
