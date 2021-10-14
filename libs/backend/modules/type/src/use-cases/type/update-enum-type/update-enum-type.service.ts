import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphEntityType,
  DgraphEnumType,
  DgraphRepository,
  DgraphUpdateMutationJson,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Mutation, Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { UpdateTagsOftypeService } from '../update-tags-of-type'
import { UpdateEnumTypeInput } from './update-enum-type.input'

@Injectable()
export class UpdateEnumTypeService extends DgraphUseCase<UpdateEnumTypeInput> {
  constructor(
    dgraph: DgraphRepository,
    private typeValidator: TypeValidator,
    private readonly updateTagsOfTypeSerivce: UpdateTagsOftypeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateEnumTypeInput, txn: Txn) {
    await this.validate(request)

    await this.updateTagsOfTypeSerivce.executeTransaction(request)
    await this.getOldValuesToDelete(request)

    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  private createMutation({
    typeId,
    updateData: { allowedValues, name, tagIds },
  }: UpdateEnumTypeInput) {
    const mu: Mutation = {}

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
      tags: tagIds?.map((id) => ({ uid: id })),
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

    await this.dgraph.transactionWrapper((txn) =>
      this.dgraph.executeUpsert(
        txn,
        `
          {
            query(func: uid(${typeId})) @normalize {
              allowedValues ${
                updatedIds && updatedIds.length
                  ? `@filter(NOT uid(${updatedIds}))`
                  : ''
              } {
                idToDelete as uid
              }
            }
        }
       `,
        `
          delete {
            uid(idToDelete) * * .
            <${typeId}> <allowedValues> uid(idToDelete) .
          }
        `,
      ),
    )
  }
}
