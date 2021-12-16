import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { GetAtomService } from '@codelab/backend/modules/atom'
import { createElement } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { CreateElementRequest } from './create-element.request'

@Injectable()
export class CreateElementService
  implements UseCasePort<CreateElementRequest, CreateResponse>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private getAtomService: GetAtomService,
    private elementValidator: ElementValidator,
  ) {}

  async execute(request: CreateElementRequest): Promise<CreateResponse> {
    const { foundAtom } = await this.validate(request)
    const order = await this.getOrder(request)
    const { input, currentUser } = request

    const element = createElement({
      parentElement: input.parentElementId
        ? { id: input.parentElementId, order }
        : undefined,
      componentTag: undefined,
      instanceOfComponent: input.instanceOfComponentId
        ? { id: input.instanceOfComponentId }
        : undefined,
      fixedId: undefined,
      props: { data: input.props ?? '{}' },
      name: input.name,
      atom: foundAtom,
      owner: currentUser?.id ? { id: currentUser.id } : undefined,
      css: input.css,
      propTransformationJs: undefined,
      renderForEachPropKey: undefined,
      renderIfPropKey: undefined,
      propMapBindings: [],
      hooks: [],
    })

    return this.elementRepository.create(element, request.transaction)
  }

  private async getOrder({
    input: { order, parentElementId },
    transaction,
  }: CreateElementRequest): Promise<number> {
    if (typeof order === 'number') {
      return order
    }

    if (parentElementId) {
      const lastOrder = await this.elementRepository.getLastOrderInParent(
        parentElementId,
        transaction,
      )

      if (typeof lastOrder === 'number') {
        return lastOrder + 1
      }
    }

    return 1
  }

  protected async validate({
    input: { parentElementId, instanceOfComponentId, atomId },
    currentUser,
    transaction,
  }: CreateElementRequest) {
    if (instanceOfComponentId) {
      const components = await this.elementRepository.getComponents(
        { uids: [instanceOfComponentId] },
        transaction,
      )

      if (components.length === 0) {
        throw new Error('Component not found')
      }
    }

    if (parentElementId) {
      await this.elementValidator.existsAndIsOwnedBy(
        parentElementId,
        currentUser,
        transaction,
      )
    }

    if (atomId) {
      const foundAtom = await this.getAtomService.execute({
        where: { id: atomId },
      })

      if (!foundAtom) {
        throw new Error(`Atom with id ${atomId} not found`)
      }

      return { foundAtom }
    }

    return { foundAtom: undefined }
  }
}
