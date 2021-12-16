import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { GetAtomService } from '@codelab/backend/modules/atom'
import { createElement, TagSchema } from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/element-repository.interface'
import { GetLastOrderChildService } from '../get-last-order-child'
import { CreateElementInput } from './create-element.input'
import { CreateElementRequest } from './create-element.request'

@Injectable()
export class CreateElementService
  implements UseCasePort<CreateElementRequest, CreateResponse>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private getLastOrderChildService: GetLastOrderChildService,
    private getAtomService: GetAtomService,
    private elementValidator: ElementValidator,
  ) {}

  async execute(request: CreateElementRequest): Promise<CreateResponse> {
    const { foundAtom } = await this.validate(request)
    const { input } = request
    const order = await this.getOrder(input)

    const element = createElement({
      order,
      parentElementId: input.parentElementId,
      componentTag: undefined,
      instanceOfComponent: input.instanceOfComponentId
        ? { id: input.instanceOfComponentId }
        : undefined,
      componentFixedId: input.componentFixedId,
      props: {
        data: input.props ?? '{}',
      },
      hooks: [],
      name: input.name,
      atom: foundAtom,
      ownerId: request.currentUser?.id,
      css: input.css,
      propMapBindings: [],
      propTransformationJs: input.propTransformationJs,
      renderForEachPropKey: input.renderForEachPropKey,
      renderIfPropKey: input.renderIfPropKey,
    })

    if (input.isComponent) {
      element.componentTag = TagSchema.parse({
        name: element.name,
        parent: undefined,
        children: [],
        isRoot: true,
      })
    }

    return this.elementRepository.save(element, request.transaction)
  }

  /**
   * Returns the order from the request if defined, if not - gets the order of the last child of the same parent
   * and returns it + 1
   */
  private async getOrder(request: CreateElementInput): Promise<number> {
    const { order, parentElementId } = request

    if (order) {
      return order
    }

    if (parentElementId) {
      // if we don't have order - put it last
      const lastOrderChild = await this.getLastOrderChildService.execute({
        elementId: parentElementId,
      })

      if (lastOrderChild && typeof lastOrderChild.order === 'number') {
        return lastOrderChild.order + 1
      }
    }

    // If nothing else - put it by default as 1
    return 1
  }

  protected async validate({ input, currentUser }: CreateElementRequest) {
    const { parentElementId, instanceOfComponentId, isComponent } = input

    if (isComponent && instanceOfComponentId) {
      throw new Error('Cannot set both instanceOfComponentId and isComponent')
    }

    if (parentElementId) {
      await this.elementValidator.existsAndIsOwnedBy(
        parentElementId,
        currentUser,
      )
    }

    const atomId = input.atomId

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
