import { UseCasePort } from '@codelab/backend/abstract/core'
import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { IAtom } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetAtomService } from '../get-atom'
import { UpdateAtomInput } from './update-atom.input'

@Injectable()
export class UpdateAtomService
  extends DgraphUseCase<UpdateAtomInput>
  implements UseCasePort<UpdateAtomInput, void>
{
  constructor(
    dgraph: DgraphRepository,
    private getAtomService: GetAtomService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdateAtomInput,
    txn: Txn,
  ): Promise<void> {
    const { atom } = await this.validate(request)

    await txn.mutate({
      mutation: `
          upsert {
            query {
              getTag(func: uid(${atom.id})) {
                tags
              }
            }
            mutation {
              delete {
                <${atom.id}> <tags> * .
              }
            }
          }
        `,
    })

    await this.dgraph.executeMutation(
      txn,
      UpdateAtomService.createMutation(request, atom),
    )
  }

  private static createMutation(
    { id, data: { name, type, api, tags } }: UpdateAtomInput,
    atom: IAtom,
  ) {
    return jsonMutation({
      uid: id,
      atomType: type,
      name,
      tags,
      api: api
        ? {
            uid: api,
          }
        : atom.api
        ? {
            uid: atom.api.id,
            name: `${name} API`,
          }
        : null,
    })
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
