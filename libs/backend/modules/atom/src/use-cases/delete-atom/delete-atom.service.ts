import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphAtom,
  DgraphEntityType,
  DgraphInterfaceType,
  DgraphRepository,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'
import { DeleteAtomInput } from './delete-atom.input'

@Injectable()
export class DeleteAtomService extends DgraphUseCase<DeleteAtomInput> {
  constructor(
    dgraph: DgraphRepository,
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

    const mu: Mutation = {
      mutation: `
        upsert {
          query {
            q(func: uid(${atomId}) @filter(eq(dgraph.type, ${DgraphEntityType.Atom}) @recurse {
              ATOM as uid
              API as api
              fields
            }
          }
          mutation {
            delete {
              uid(ATOM) * * .
            }
          }
        }
      `,
    }

    // await this.dgraph.executeMutation(txn, mu)

    await this.dgraph.executeUpsertDeleteAll(txn, (q) =>
      q
        .addTypeFilterDirective(DgraphEntityType.Atom)
        .setUidFunc(atomId)
        .addJsonFields<DgraphAtom & DgraphInterfaceType>({
          api: true,
          fields: true,
        }),
    )
  }

  protected async validate({ atomId }: DeleteAtomInput) {
    const atom = await this.getAtomService.execute({ where: { id: atomId } })

    if (!atom) {
      throw new Error("Can't delete, atom not found")
    }
  }
}
