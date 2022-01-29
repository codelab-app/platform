import {
  ITransaction,
  ITypeRepository,
  ITypeRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { IField, TypeKind } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { GetFieldRequest } from './get-field.request'

@Injectable()
export class GetFieldService
  extends DgraphUseCase<GetFieldRequest, Maybe<IField>>
  implements UseCasePort<GetFieldRequest, Maybe<IField>>
{
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(ITypeRepositoryToken)
    private typeRepository: ITypeRepository,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    { input: { byId, byInterface } }: GetFieldRequest,
    txn: ITransaction,
  ): Promise<Maybe<IField>> {
    if (byId) {
      return this.typeRepository.getField(byId.fieldId, txn)
    }

    if (byInterface) {
      const theInterface = await this.typeRepository.getOneWhere(
        { id: byInterface.interfaceId },
        txn,
      )

      if (!theInterface || theInterface.typeKind !== TypeKind.InterfaceType) {
        return undefined
      }

      return theInterface.fields.find((f) => byInterface.fieldKey === f.key)
    }

    throw new Error('At least one filter must be provided to GetField')
  }
}
