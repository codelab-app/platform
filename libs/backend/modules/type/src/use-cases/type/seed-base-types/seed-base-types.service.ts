import { ApolloClient } from '@apollo/client'
import { UseCasePort } from '@codelab/backend/abstract/core'
import { ApolloClientTokens, Auth0Service } from '@codelab/backend/infra'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { Inject, Injectable } from '@nestjs/common'
import { BaseTypeName, baseTypes } from '../../../domain/data/baseTypes'
import { CreateTypeInput, CreateTypeService } from '../create-type'
import { GetTypeService } from '../get-type'

/**
 * Seeds all default types like primitives
 */
@Injectable()
export class SeedBaseTypesService implements UseCasePort<void, void> {
  constructor(
    @Inject(ApolloClientTokens.ApolloClientProvider)
    private readonly client: ApolloClient<any>,
    private auth0Service: Auth0Service,
    private getTypeService: GetTypeService,
    private createTypeService: CreateTypeService,
  ) {
    console.log(this.auth0Service.getAccessToken())
  }

  async execute(): Promise<any> {
    return this.seedTypesIfMissing(baseTypes)
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
    return this.getTypeService
      .execute({ input: { where: { name } } })
      .then((type) => type?.name)
  }

  private async createType(typeInput: CreateTypeInput) {
    return this.createTypeService.execute(typeInput).then((type) => type.id)
  }
}
