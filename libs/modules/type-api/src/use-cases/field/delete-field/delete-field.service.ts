import {
  DgraphEntity,
  DgraphEntityType,
  DgraphQueryBuilder,
  DgraphRepository,
  DgraphUseCase,
} from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { FieldValidator } from '../../../field.validator'
import { DeleteFieldRequest } from './delete-field.request'

@Injectable()
export class DeleteFieldService extends DgraphUseCase<DeleteFieldRequest> {
  constructor(
    dgraph: DgraphRepository,
    private fieldValidator: FieldValidator,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(request: DeleteFieldRequest, txn: Txn) {
    const {
      input: { fieldId },
    } = request

    await this.validate(request)

    const interfaceId = await this.getInterfaceId(fieldId)

    await this.dgraph.deleteEntity(
      txn,
      fieldId,
      `<${interfaceId}> <fields> <${fieldId}> .`,
    )
  }

  private async getInterfaceId(fieldId: string) {
    const field = await this.dgraph.transactionWrapper<
      DgraphEntity<any> & { '~fields': [{ uid: string }] }
    >((txn2) =>
      this.dgraph.getOneOrThrow(
        txn2,
        new DgraphQueryBuilder()
          .addTypeFilterDirective(DgraphEntityType.Field)
          .setUidFunc(fieldId)
          .addFields(`~fields { uid }`),
        () => new Error("Field doesn't exist"),
      ),
    )

    return field['~fields'][0].uid
  }

  private async validate({ input: { fieldId } }: DeleteFieldRequest) {
    await this.fieldValidator.exists(fieldId)
  }
}
