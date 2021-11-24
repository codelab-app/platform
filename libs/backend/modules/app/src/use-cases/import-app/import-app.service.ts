import { CreateResponse, DgraphUseCase } from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { CreatePageService } from '@codelab/backend/modules/page'
import { ExportAppSchema } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import { Injectable } from '@nestjs/common'
import { AppValidator } from '../../domain/app.validator'
import { CreateAppService } from '../create-app'
import { GetAppService } from '../get-app'
import { ImportAppRequest } from './import-app.request'

@Injectable()
export class ExportAppService extends DgraphUseCase<
  ImportAppRequest,
  CreateResponse
> {
  constructor(
    dgraph: DgraphRepository,
    protected appValidator: AppValidator,
    protected getAppService: GetAppService,
    protected createAppService: CreateAppService,
    protected createPageService: CreatePageService, // protected createComponentService: CreateComponentService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction({
    input,
    currentUser,
  }: ImportAppRequest): Promise<CreateResponse> {
    const payload = ExportAppSchema.parse(input.payload)

    const { id: appId } = await this.createAppService.execute({
      currentUser,
      input: {
        name: payload.name,
      },
    })

    // Keep a map of created component ids to payload component ids, in case there's duplicates
    const componentIdMap = new Map<string, string>()

    for (const payloadPage of payload.pages) {
      const newPage = await this.createPageService.execute({
        input: { appId, name: payloadPage.name },
        currentUser,
      })

      const elementTree = new ElementTree(payloadPage.elements)
      const components = elementTree.getAllComponents()

      for (const component of components) {
        // const { id: componentId } = await this.createComponentService.execute({
        //   input: {
        //     name: component.name,
        //   },
        //   currentUser,
        // })
        // componentIdMap.set(component.id, componentId)
      }
    }

    return { id: '' }
  }
}
