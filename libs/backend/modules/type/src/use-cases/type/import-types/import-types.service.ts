import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { ImportTypeService } from '../import-type'
import { ImportTypeServiceInput } from '../import-type/import-type.input'
import { ImportTypesRequest } from './import-types.request'

@Injectable()
export class ImportTypesService
  implements UseCasePort<ImportTypesRequest, Array<CreateResponse>>
{
  constructor(
    private importTypeService: ImportTypeService,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async execute(request: ImportTypesRequest): Promise<Array<CreateResponse>> {
    const {
      input: { payload },
      currentUser,
      transaction,
    } = request

    const data = JSON.parse(payload) as Array<ImportTypeServiceInput>
    const result: Array<CreateResponse> = []

    for (const api of data) {
      const apiRes = await this.importTypeService.execute({
        input: api,
        currentUser,
        transaction,
      })

      result.push(apiRes)
    }

    return result
  }
}
