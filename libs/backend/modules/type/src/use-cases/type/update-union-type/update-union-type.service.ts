import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository, jsonMutation } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { UpdateUnionTypeInput } from './update-union-type.input'

@Injectable()
export class UpdateUnionTypeService extends DgraphUseCase<UpdateUnionTypeInput> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateUnionTypeInput, txn: Txn) {
    await this.getOldValuesToDelete(request)
    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  private async getOldValuesToDelete({
    typeId,
    updateData: { typeIdsOfUnionType },
  }: UpdateUnionTypeInput) {
    await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeUpsert(
        txn,
        `
          {
            query(func: uid(${typeId})) @normalize {
              typesOfUnionType ${
                typeIdsOfUnionType && typeIdsOfUnionType.length
                  ? `@filter(NOT uid(${typeIdsOfUnionType}))`
                  : ''
              } {
                idToDelete as uid
              }
            }
        }
       `,
        `
          delete {
            <${typeId}> <typesOfUnionType> uid(idToDelete) .
          }
        `,
      ),
    )
  }

  private createMutation({
    typeId,
    updateData: { name, typeIdsOfUnionType },
  }: UpdateUnionTypeInput) {
    return jsonMutation({
      uid: typeId,
      name,
      typesOfUnionType: typeIdsOfUnionType.map((id) => ({ uid: id })),
    })
  }
}
