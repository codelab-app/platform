import { UseCasePort } from '@codelab/backend/abstract/core'
import { IField, TypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { ITypeRepository, ITypeRepositoryToken } from '../../../infrastructure'
import { GetFieldRequest } from './get-field.request'

@Injectable()
export class GetFieldService
  implements UseCasePort<GetFieldRequest, Maybe<IField>>
{
  constructor(
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
  ) {}

  async execute({
    input: { byId, byInterface },
    transaction,
  }: GetFieldRequest): Promise<Maybe<IField>> {
    if (byId) {
      return this.typeRepository.getField(byId.fieldId, transaction)
    }

    if (byInterface) {
      const theInterface = await this.typeRepository.getOneWhere(
        { id: byInterface.interfaceId },
        transaction,
      )

      if (!theInterface || theInterface.typeKind !== TypeKind.InterfaceType) {
        return undefined
      }

      return theInterface.fields.find((f) => byInterface.fieldKey === f.key)
    }

    throw new Error('At least one filter must be provided to GetField')
  }
}
