import {
  IAtomRepository,
  IAtomRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'
import { UpsertAtomsRequest } from './upsert-atoms.request'

@Injectable()
/**
 * Each atom input gets either:
 *   - Updated if ID is provided. If api is provided too, it will get replaced. If it's not, it's left as it is
 *   - Created if ID is not provided. If api is provided, it  will get assigned. If it's not - an automatic one will get generated
 */
export class UpsertAtomsService
  extends DgraphUseCase<UpsertAtomsRequest, Array<CreateResponse>>
  implements UseCasePort<UpsertAtomsRequest, Array<CreateResponse>>
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
    request: UpsertAtomsRequest,
    txn: Txn,
  ): Promise<Array<CreateResponse>> {
    // TODO: Validate api is a valid interfaceId
    const {
      input: { atoms },
      currentUser,
    } = request

    return this.atomRepo.upsertAtoms(
      atoms.map((a) => ({
        ...a,
        id: '',
        api: a.api ? { id: a.api } : { id: '' },
      })),
      currentUser,
      txn,
    )
  }
}
