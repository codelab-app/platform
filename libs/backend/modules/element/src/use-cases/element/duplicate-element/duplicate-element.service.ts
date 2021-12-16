import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import {
  attachComponentTag,
  IElement,
  IElementGraph,
  IHook,
  IPropMapBinding,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { DuplicateElementRequest } from './duplicate-element.request'

@Injectable()
export class DuplicateElementService
  implements UseCasePort<DuplicateElementRequest, CreateResponse>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private elementValidator: ElementValidator,
  ) {}

  async execute(request: DuplicateElementRequest): Promise<CreateResponse> {
    await this.validate(request)

    const {
      input: { elementId },
      transaction,
      currentUser,
    } = request

    const elementGraph = await this.elementRepository.getGraph(
      elementId,
      transaction,
    )

    if (!elementGraph) {
      throw new Error('Element not found')
    }

    const cloneElement = (toClone: IElement): IElement | undefined => {
      // Don't clone components except the root if it is one
      if (toClone.componentTag && toClone.id !== elementId) {
        return undefined
      }

      const newElement: IElement = {
        ...toClone,
        props: { id: '', data: toClone.props.data },
        componentTag: null,
        fixedId: v4(),
        hooks:
          toClone.hooks?.map(
            (hook) =>
              ({
                ...hook,
                id: '',
                config: { ...hook.config, id: '' },
              } as IHook),
          ) ?? [],
        propMapBindings:
          toClone.propMapBindings?.map(
            (pmb) => ({ ...pmb, id: '' } as IPropMapBinding),
          ) ?? [],
        owner: currentUser?.id ? { id: currentUser.id } : undefined,
      }

      if (newElement.componentTag) {
        attachComponentTag(
          newElement,
          currentUser,
          newElement.componentTag.name,
        )
      }

      return newElement
    }

    const newGraph: IElementGraph = {
      vertices: elementGraph.vertices
        .map(cloneElement)
        .filter((e): e is IElement => !!e),
      edges: elementGraph.edges,
    }

    return this.elementRepository.createGraph(newGraph, request.transaction)
  }

  protected async validate({
    input: { elementId },
    currentUser,
    transaction,
  }: DuplicateElementRequest) {
    await this.elementValidator.existsAndIsOwnedBy(
      elementId,
      currentUser,
      transaction,
    )
  }
}
