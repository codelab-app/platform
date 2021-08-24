import { ApolloClient } from '@apollo/client'
import { UseCasePort } from '@codelab/backend/abstract/core'
import { ApolloClientTokens } from '@codelab/backend/infra'
import { createIfMissing } from '@codelab/backend/shared/utils'
import {
  CreateTypeGql,
  CreateTypeInput,
  CreateTypeMutation,
  CreateTypeMutationVariables,
  GetTypeGql,
  GetTypeQuery,
  GetTypeQueryVariables,
} from '@codelab/shared/codegen/graphql'
import { Inject, Injectable } from '@nestjs/common'
import { BaseTypeName } from '../../../domain/data/baseTypes'

@Injectable()
export class SeedBaseTypesService
  implements UseCasePort<Array<CreateTypeInput>, any>
{
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    private readonly client: ApolloClient<any>,
  ) {}

  public execute(input: Array<CreateTypeInput>): Promise<any> {
    return this.seedTypesIfMissing(input)
  }

  private async seedTypesIfMissing(types: Array<CreateTypeInput>) {
    const results = await Promise.all(
      types.map((type) =>
        this.seedTypeIfMissing(type).then((id) => ({
          key: type.name,
          id,
        })),
      ),
    )

    return new Map(results.map(({ key, id }) => [key as BaseTypeName, id]))
  }

  private async seedTypeIfMissing(input: CreateTypeInput): Promise<string> {
    return createIfMissing(
      () => this.getTypeByName(input.name),
      () => this.createType(input),
    )
  }

  private getTypeByName(name: string) {
    return this.client
      .query<GetTypeQuery, GetTypeQueryVariables>({
        query: GetTypeGql,
        variables: {
          input: { where: { name } },
        },
      })
      .then((r) => r.data.getType?.name)
  }

  private async createType(typeInput: CreateTypeInput) {
    return this.client
      .query<CreateTypeMutation, CreateTypeMutationVariables>({
        query: CreateTypeGql,
        variables: {
          input: typeInput,
        },
      })
      .then((r) => {
        if (!r.data.createType) {
          throw new Error(
            `Something went wrong while creating type ${typeInput.name}`,
          )
        }

        console.log(`Created type ${typeInput.name}`)

        return r.data.createType.id
      })
  }
}
