import { FetchResult } from '@apollo/client'
import { MutationUseCase } from '@codelab/backend'
import {
  CreateInterfaceGql,
  CreateInterfaceMutation,
  CreateInterfaceMutationVariables,
} from '@codelab/dgraph'
import { Injectable } from '@nestjs/common'
import { Interface, interfaceSchema } from '../../../models'
import { CreateInterfaceRequest } from './create-interface.request'

type GqlVariablesType = CreateInterfaceMutationVariables
type GqlOperationType = CreateInterfaceMutation

@Injectable()
export class CreateInterfaceService extends MutationUseCase<
  CreateInterfaceRequest,
  Interface,
  GqlOperationType,
  GqlVariablesType
> {
  protected getGql() {
    return CreateInterfaceGql
  }

  protected extractDataFromResult(result: FetchResult<GqlOperationType>) {
    const createdInterfaces = result?.data?.addInterface?.interface

    if (!createdInterfaces || !createdInterfaces.length) {
      throw new Error('Error while creating interface')
    }

    return interfaceSchema.parse({
      ...createdInterfaces[0],
      // We know that the interface is just created and
      // we don't allow to create types and fields here, so
      // we know that we don't have fields and types. We can skip another round trip
      // and avoid calling GetInterfaceService
      fields: [],
      types: [],
    })
  }

  protected mapVariables({
    input: { name },
  }: CreateInterfaceRequest): GqlVariablesType {
    return {
      input: { name },
    }
  }
}
