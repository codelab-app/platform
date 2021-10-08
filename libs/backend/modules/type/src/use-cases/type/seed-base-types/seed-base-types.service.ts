import { UseCasePort } from '@codelab/backend/abstract/core'
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
    await this.seedTypesIfMissing(baseTypes, request.currentUser)
  }

  private async seedTypesIfMissing(
    types: Array<CreateTypeInput>,
    currentUser: IUser,
  ) {
    await Promise.all(
      types.map((type) =>
        this.seedTypeIfMissing({ input: type, currentUser }).then((id) => ({
          key: type.name,
          id,
        })),
      ),
    )
  }

  private async seedTypeIfMissing({
    input,
    currentUser,
  }: CreateTypeRequest): Promise<string> {
    return await createIfMissing(
      () => this.getTypeByName(input.name, currentUser),
      () => this.createType({ input, currentUser }),
    )
  }

  private async getTypeByName(name: string, currentUser: IUser) {
    return await this.getTypeService
      .execute({ input: { where: { name } }, currentUser })
      .then((type) => type?.name)
  }

  private async createType({ input, currentUser }: CreateTypeRequest) {
    return await this.createTypeService
      .execute({ input, currentUser })
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
