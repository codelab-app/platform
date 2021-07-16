import {
  DgraphEntityType,
  DgraphEnumType,
  DgraphRepository,
  DgraphUpdateMutationJson,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js'
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
    const mu = new Mutation()

    // Delete all EnumTypeValues that are not in the new array
    mu.setDelNquads(`
      ${idsToDelete
        .map(
          (id) => `
                    <${id}> * * .
                    <${typeId}> <allowedValues> <${id}> .
            `,
        )
        .join(' ')}
    `)

    // Create or update all other
    const updateJson: DgraphUpdateMutationJson<DgraphEnumType> = {
      uid: typeId,
      name,
      allowedValues: allowedValues.map((av) => ({
        uid: av.id,
        'dgraph.type': [DgraphEntityType.EnumTypeValue],
        name: av.name ?? undefined,
        stringValue: av.value,
      })),
    }

    mu.setSetJson(updateJson)

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
