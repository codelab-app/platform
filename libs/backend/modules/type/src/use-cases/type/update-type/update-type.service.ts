import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphRepository,
  DgraphType,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { UpdateTagsOftypeService } from '../update-tags-of-type'
import { UpdateTypeInput } from './update-type.input'

@Injectable()
export class UpdateTypeService extends DgraphUseCase<UpdateTypeInput> {
  constructor(
    dgraph: DgraphRepository,
    private typeValidator: TypeValidator,
    private readonly updateTagsOfTypeSerivce: UpdateTagsOftypeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: UpdateTypeInput, txn: Txn) {
    await this.validate(request)
    await this.updateTagsOfTypeSerivce.executeTransaction(request)
    await this.dgraph.executeMutation(
      txn,
      UpdateTypeService.createMutation(request),
    )
  }

  private static createMutation({
    typeId,
    updateData: { name, tagIds },
  }: UpdateTypeInput) {
    return jsonMutation<DgraphType<any>>({
      uid: typeId,
      tags: tagIds?.map((id) => ({ uid: id })),
      name,
    })
  }

  private async validate(request: UpdateTypeInput) {
    await this.typeValidator.typeExists(request.typeId)
  }
}
