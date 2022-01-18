import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { LoggerService, LoggerTokens } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { ImportTypeservice } from '../import-type'
import { ImportTypeServiceInput } from '../import-type/import-type.input'
import { ImportTypesRequest } from './import-types.request'

@Injectable()
export class ImportTypesService
  implements UseCasePort<ImportTypesRequest, Array<CreateResponse>>
{
  constructor(
    private importTypeservice: ImportTypeservice,
    @Inject(LoggerTokens.LoggerProvider) private logger: LoggerService,
  ) {}

  async execute(request: ImportTypesRequest): Promise<Array<CreateResponse>> {
    const {
      input: { payload },
      currentUser,
    } = request

    const data = JSON.parse(payload) as Array<ImportTypeServiceInput>

    const promises = data.map((api) =>
      this.importTypeservice.execute({
        input: api,
        currentUser,
      }),
    )

    return Promise.all(promises)
  }
}
