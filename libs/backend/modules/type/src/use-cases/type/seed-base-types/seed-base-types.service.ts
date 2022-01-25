import { UseCasePort } from '@codelab/backend/abstract/core'
import { ITransaction } from '@codelab/backend/infra'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { IUser } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { baseTypes } from '../../../domain/data/baseTypes'
import {
  CreateTypeInput,
  CreateTypeRequest,
  CreateTypeService,
} from '../create-type'
import { GetTypeService } from '../get-type'
import { SeedBaseTypesRequest } from './seed-base-types.request'

/**
 * Seeds all default types like primitives
 */
@Injectable()
export class SeedBaseTypesService
  implements UseCasePort<SeedBaseTypesRequest, void>
{
  constructor(
    private getTypeService: GetTypeService,
    private createTypeService: CreateTypeService,
  ) {}

  async execute(request: SeedBaseTypesRequest): Promise<void> {
    await this.seedTypesIfMissing(
      baseTypes,
      request.currentUser,
      request.transaction,
    )
  }

  private async seedTypesIfMissing(
    types: Array<CreateTypeInput>,
    currentUser: IUser,
    transaction: ITransaction,
  ) {
    await Promise.all(
      types.map((type) =>
        this.seedTypeIfMissing({ input: type, currentUser, transaction }).then(
          (id) => ({
            key: type.name,
            id,
          }),
        ),
      ),
    )
  }

  private async seedTypeIfMissing({
    input,
    currentUser,
    transaction,
  }: CreateTypeRequest): Promise<string> {
    return await createIfMissing(
      () => this.getTypeByName(input.name, transaction),
      () => this.createType({ input, currentUser, transaction }),
    )
  }

  private async getTypeByName(name: string, transaction: ITransaction) {
    return await this.getTypeService
      .execute({ input: { where: { name } }, transaction })
      .then((type) => type?.name)
  }

  private async createType({
    input,
    currentUser,
    transaction,
  }: CreateTypeRequest) {
    return await this.createTypeService
      .execute({ input, currentUser, transaction })
      .then((r) => {
        if (!r.id) {
          throw new Error(
            `Something went wrong while creating type ${input.name}`,
          )
        }

        console.log(`Created type ${input.name}`)

        return r.id
      })
  }
}
