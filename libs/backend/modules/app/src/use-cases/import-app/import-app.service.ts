import {
  IElementRepository,
  IElementRepositoryToken,
  UseCasePort,
} from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { GetAtomsService } from '@codelab/backend/modules/atom'
import { IExportApp } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { CreateAppService } from '../create-app'
import { AppImporter } from './app-importer'
import { ImportAppRequest } from './import-app.request'
import { parsePayload } from './utils'

@Injectable()
export class ImportAppService
  implements UseCasePort<ImportAppRequest, CreateResponse>
{
  constructor(
    protected createAppService: CreateAppService,
    protected getAtomsService: GetAtomsService,
    @Inject(IElementRepositoryToken) protected elementRepo: IElementRepository,
  ) {}

  async execute({
    input: { payload },
    currentUser,
    transaction,
  }: ImportAppRequest): Promise<CreateResponse> {
    const parsedPayload: IExportApp = parsePayload(payload)

    // Abstracted the payload to the AppImporter class, because
    // it's much easier to manage the internal state
    const importer = new AppImporter(
      parsedPayload,
      currentUser,
      transaction,
      this.createAppService,
      this.getAtomsService,
      this.elementRepo,
    )

    const { app } = await importer.import()

    return { id: app.id }
  }
}
