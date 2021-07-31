import {
  DgraphEntityType,
  DgraphEnumType,
  DgraphRepository,
  DgraphUpdateMutationJson,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../type.validator'
import { UpdateEnumTypeInput } from './update-enum-type.input'

@Injectable()
export class UpdateEnumTypeService extends DgraphUseCase<UpdateEnumTypeInput> {
  constructor(dgraph: DgraphRepository, private typeValidator: TypeValidator) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateEnumTypeInput, txn: Txn) {
    await this.validate(request)

    const idsToDelete = await this.getOldValuesToDelete(request)
    await this.dgraph.executeMutation(
      txn,
      this.createMutation(request, idsToDelete),
    )
  }

  private createMutation(
    { typeId, updateData: { name, allowedValues } }: UpdateEnumTypeInput,
    idsToDelete: Array<string>,
  ) {
    const mu: Mutation = {}

    // Delete all EnumTypeValues that are not in the new array
    mu.deleteNquads = `
      ${idsToDelete
        .map(
          (id) => `
                    <${id}> * * .
                    <${typeId}> <allowedValues> <${id}> .
            `,
        )
        .join(' ')}
    `

    // Create or update all other
    const updateEnumTypeJson: DgraphUpdateMutationJson<DgraphEnumType> = {
      uid: typeId,
      name,
      allowedValues: allowedValues.map((av) => ({
        uid: av.id,
        'dgraph.type': [DgraphEntityType.EnumTypeValue],
        name: av.name ?? undefined,
        stringValue: av.value,
      })),
    }

    mu.setJson = updateEnumTypeJson

    return mu
  }

  private async validate(request: UpdateEnumTypeInput) {
    await this.typeValidator.typeExists(request.typeId)
  }

  private async getOldValuesToDelete({
    typeId,
    updateData: { allowedValues },
  }: UpdateEnumTypeInput) {
    // Fetch all EnumTypeValues that are not in the new array
    const updatedIds = allowedValues.map((av) => av.id).filter((id) => !!id)

    const result = await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.getAllNamed<{ idToDelete: string }>(
        txn,
        `
          {
            query(func: uid(${typeId})) @normalize {
              allowedValues ${
                updatedIds && updatedIds.length
                  ? `@filter(NOT uid(${updatedIds}))`
                  : ''
              } {
                idToDelete: uid
              }
            }
        }
       `,
        'query',
      ),
    )

    return result
      .filter((r) => !!r && !!r.idToDelete)
      .map((r) => r.idToDelete as string)
  }
}
