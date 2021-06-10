import { DeleteResponse } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Interface } from './models'
import {
  CreateInterfaceInput,
  CreateInterfaceService,
  DeleteInterfaceInput,
  DeleteInterfaceService,
  GetInterfaceInput,
  GetInterfaceService,
  UpdateInterfaceInput,
  UpdateInterfaceService,
} from './use-cases'

@Resolver(() => Interface)
@Injectable()
export class InterfaceResolver {
  constructor(
    private getInterfaceService: GetInterfaceService,
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
}
