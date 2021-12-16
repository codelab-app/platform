import { UseCasePort } from '@codelab/backend/abstract/core'
import { GetAtomService } from '@codelab/backend/modules/atom'
import { Inject, Injectable } from '@nestjs/common'
import { ElementValidator } from '../../../application/element.validator'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { UpdateElementRequest } from './update-element.request'

@Injectable()
export class UpdateElementService
  implements UseCasePort<UpdateElementRequest, void>
{
  constructor(
    @Inject(IElementRepositoryToken)
    protected readonly elementRepository: IElementRepository,
    private getAtomService: GetAtomService,
    private elementValidator: ElementValidator,
  ) {}

  async execute(request: UpdateElementRequest) {
    await this.validate(request)

    const {
      input: {
        id,
        data: {
          atomId,
          css,
          name,
          renderIfPropKey,
          renderForEachPropKey,
          propTransformationJs,
          instanceOfComponentId,
        },
      },
      transaction,
    } = request

    const element = await this.elementRepository.getOne(id, transaction)

    if (!element) {
      // Should never happen, we check in .validate()
      throw new Error('Element not found')
    }

    if (atomId) {
      const atom = await this.getAtomService.execute({ where: { id: atomId } })

      if (!atom) {
        throw new Error('Atom not found')
      }

      element.atom = atom
    }

    element.css = css
    element.renderIfPropKey = renderIfPropKey
    element.renderForEachPropKey = renderForEachPropKey
    element.propTransformationJs = propTransformationJs
    element.name = name
    element.instanceOfComponent = instanceOfComponentId
      ? { id: instanceOfComponentId }
      : undefined

    if (
      element.componentTag &&
      element.componentTag.name === element.name &&
      name
    ) {
      element.componentTag.name = name
    }

    await this.elementRepository.update(element, transaction)
  }

  protected async validate({
    input: { id },
    transaction,
    currentUser,
  }: UpdateElementRequest): Promise<void> {
    await this.elementValidator.existsAndIsOwnedBy(id, currentUser, transaction)
  }
}
