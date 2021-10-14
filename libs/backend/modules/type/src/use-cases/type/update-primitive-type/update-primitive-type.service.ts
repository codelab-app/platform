import { DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphPrimitiveType,
  DgraphRepository,
  jsonMutation,
} from '@codelab/backend/infra'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { TypeValidator } from '../../../domain/type.validator'
import { UpdateTagsOftypeService } from '../update-tags-of-type'
import { UpdatePrimitiveTypeInput } from './update-primitive-type.input'

@Injectable()
export class UpdatePrimitiveTypeService extends DgraphUseCase<UpdatePrimitiveTypeInput> {
  constructor(
    dgraph: DgraphRepository,
    private typeValidator: TypeValidator,
    private readonly updateTagsOfTypeSerivce: UpdateTagsOftypeService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: UpdatePrimitiveTypeInput,
    txn: Txn,
  ) {
    await this.validate(request)
    await this.dgraph.executeMutation(txn, this.createMutation(request))
  }

  private async validate(request: UpdatePrimitiveTypeInput) {
    await this.typeValidator.typeExists(request.typeId)
  }

  private createMutation({
    typeId,
    updateData: { name, primitiveKind, tagIds },
  }: UpdatePrimitiveTypeInput) {
    return jsonMutation<DgraphPrimitiveType>({
      uid: typeId,
      name,
      primitiveKind,
      tags: tagIds?.map((id) => ({ uid: id })),
    })
  }
}
