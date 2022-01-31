import {
  IAtomRepository,
  IAtomRepositoryToken,
  ITransaction,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { AtomSchema, IAtom } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { Inject, Injectable } from '@nestjs/common'
import { GetAtomInput } from './get-atom.input'
import { GetAtomRequest } from './get-atom.request'

@Injectable()
export class GetAtomService
  extends DgraphUseCase<GetAtomRequest, Maybe<IAtom>>
  implements UseCasePort<GetAtomRequest, Maybe<IAtom>>
{
  protected autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    @Inject(IAtomRepositoryToken) private atomRepo: IAtomRepository,
  ) {
    super(dgraph)
  }

  protected schema = AtomSchema.nullable()

  async executeTransaction(
    { input }: GetAtomRequest,
    txn: ITransaction,
  ): Promise<Maybe<IAtom>> {
    GetAtomService.validate(input)

    const {
      where: { id, type, element },
    } = input

    if (id) {
      return this.atomRepo.getOne(id, txn)
    }

    if (type) {
      return this.atomRepo.getAtomByType(type, txn)
    }

    if (element) {
      return this.atomRepo.getAtomByElement(element, txn)
    }

    throw new Error('Bad input to GetAtomsService')
  }

  private static validate({ where: { id, element, type } }: GetAtomInput) {
    if ([id, element, type].filter((f) => !!f).length !== 1) {
      throw new Error('Provide exactly one filter to GetAtomService')
    }
  }
}
