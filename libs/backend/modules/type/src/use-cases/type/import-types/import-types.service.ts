import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import {
  DgraphRepository,
  ITransaction,
  LoggerService,
  LoggerTokens,
} from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { ImportTypeService } from '../import-type'
import { ImportTypeServiceInput } from '../import-type/import-type.input'
import { ImportTypesRequest } from './import-types.request'

@Injectable()
export class ImportTypesService extends DgraphUseCase<
  ImportTypesRequest,
  Array<CreateResponse>
> {
  protected override autoCommit = true

  constructor(
    dgraph: DgraphRepository,
    private importTypeService: ImportTypeService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: ImportTypesRequest,
    txn: ITransaction,
  ): Promise<Array<CreateResponse>> {
    const {
      input: { payload },
      currentUser,
    } = request

    const data = JSON.parse(payload) as Array<ImportTypeServiceInput>
    const result: Array<CreateResponse> = []

    for (const api of data) {
      const apiRes = await this.importTypeService.execute({
        input: api,
        currentUser,
      })

      result.push(apiRes)
    }

    return result
  }
}
