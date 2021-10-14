import { DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'

interface UpdateTagOfTypeInput {
  typeId: string
  tagIds?: Array<string>
}

@Injectable()
export class UpdateTagsOftypeService extends DgraphUseCase<UpdateTagOfTypeInput> {
  constructor(dgraph: DgraphRepository) {
    super(dgraph)
  }

  public async executeTransaction(request: UpdateTagOfTypeInput) {
    await this.getOldValuesToDelete(request)
  }

  private async getOldValuesToDelete({ typeId, updateData: { tagIds } }: any) {
    await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeUpsert(
        txn,
        `
          {
            query(func: uid(${typeId})) @normalize {
              tags ${
                tagIds && tagIds.length ? `@filter(NOT uid(${tagIds}))` : ''
              } {
                idToDelete as uid
              }
            }
        }
       `,
        `
          delete {
            <${typeId}> <tags> uid(idToDelete) .
          }
        `,
      ),
    )
  }
}
