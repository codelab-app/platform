import { UseCasePort } from '@codelab/backend/abstract/core'
import { Auth0Service } from '@codelab/backend/modules/user'
import { createIfMissing } from '@codelab/backend/shared/utils'
import { Injectable } from '@nestjs/common'
import { baseTypes } from '../../../domain/data/baseTypes'
import { CreateTypeInput, CreateTypeService } from '../create-type'
import { GetTypeService } from '../get-type'

/**
 * Seeds all default types like primitives
 */
@Injectable()
export class SeedBaseTypesService implements UseCasePort<void, void> {
  constructor(
    private auth0Service: Auth0Service,
    private getTypeService: GetTypeService,
    private createTypeService: CreateTypeService,
  ) {}

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
  }

  private async seedTypeIfMissing(input: CreateTypeInput): Promise<string> {
    // return this.createType(input)
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
    return this.createTypeService.execute(typeInput).then((r) => {
      if (!r.id) {
        throw new Error(
          `Something went wrong while creating type ${typeInput.name}`,
        )
      }

      console.log(`Created type ${typeInput.name}`)

      return r.id
    })
  }
}
