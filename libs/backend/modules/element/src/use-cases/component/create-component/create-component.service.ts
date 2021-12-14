import {
  CreateResponse,
  DgraphCreateUseCase,
} from '@codelab/backend/application'
import { DgraphRepository } from '@codelab/backend/infra'
import { IElement } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CreateElementRequest } from '../../element/create-element/create-element.request'
import { CreateElementService } from '../../element/create-element/create-element.service'
import { GetElementGraphService } from '../../element/get-element-graph'
import { UpdateElementService } from '../../element/update-element/update-element.service'
import { CreateComponentRequest } from './create-component.request'

@Injectable()
export class CreateComponentService extends DgraphCreateUseCase<CreateElementRequest> {
  constructor(
    protected readonly dgraph: DgraphRepository,
    protected readonly getElementGraphService: GetElementGraphService,
    protected createElementService: CreateElementService,
    protected updateElementService: UpdateElementService,
  ) {
    super(dgraph)
  }

  protected async executeTransaction(
    request: CreateComponentRequest,
  ): Promise<CreateResponse> {
    const { currentUser, input } = request
    const { componentFixedId } = input

    if (componentFixedId) {
      const elementGraph = await this.getElementGraphService.execute({
        input: {
          where: {
            componentFixedId,
          },
        },
        currentUser,
      })

      const element = elementGraph.vertices.filter(
        (vertex: IElement) =>
          vertex.componentFixedId === input.componentFixedId,
      )[0]

      if (element) {
        await this.updateElementService.execute({
          currentUser,
          input: {
            id: element.id,
            data: input,
          },
        })

        return {
          id: element.id,
        }
      }
    }

    return await this.createElementService.execute(request)
  }
}
