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
import { UpdateAtomInput } from './update-atom.input'

@Injectable()
export class UpdateAtomService
  extends DgraphUseCase<UpdateAtomInput>
  implements UseCasePort<UpdateAtomInput, void>
{
  protected autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    private getAtomService: GetAtomService,
    @Inject(IAtomRepositoryToken) private atomRepo: IAtomRepository,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdateAtomInput,
    txn: Txn,
  ): Promise<void> {
    const { name, type, api } = request.data
    const { atom } = await this.validate(request)

    atom.name = name
    atom.type = type

    if (api) {
      atom.api.id = api
    }

    await this.atomRepo.update(atom, txn)
  }

  private async validate({ id }: UpdateAtomInput) {
    const atom = await this.getAtomService.execute({
      input: { where: { id } },
    })

    if (!atom) {
      throw new Error("Atom doesn't exist")
    }

    return { atom }
  }
}
