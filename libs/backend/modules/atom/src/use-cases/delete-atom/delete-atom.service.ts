import {
  IAtomRepository,
  IAtomRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'
import { DeleteAtomInput } from './delete-atom.input'

@Injectable()
export class DeleteAtomService
  extends DgraphUseCase<DeleteAtomInput>
  implements UseCasePort<DeleteAtomInput, void>
{
  constructor(
    dgraph: DgraphRepository,
    @Inject(IAtomRepositoryToken)
    private atomRepo: IAtomRepository,
    private getAtomService: GetAtomService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: DeleteAtomInput,
    txn: Txn,
  ): Promise<void> {
    const { atomId } = request
    await this.validate(request)
    await this.atomRepo.delete(atomId, txn)
  }

  protected async validate({ atomId }: DeleteAtomInput) {
    const atom = await this.getAtomService.execute({
      input: { where: { id: atomId } },
    })

    if (!atom) {
      throw new Error("Can't delete, atom not found")
    }
  }
}
