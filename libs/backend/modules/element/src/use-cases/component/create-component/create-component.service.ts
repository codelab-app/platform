import { UseCasePort } from '@codelab/backend/abstract/core'
import { CreateResponse } from '@codelab/backend/application'
import { GetAtomService } from '@codelab/backend/modules/atom'
import {
  attachComponentTag,
  createElement,
  isAdmin,
} from '@codelab/shared/abstract/core'
import { Inject, Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import {
  IElementRepository,
  IElementRepositoryToken,
} from '../../../infrastructure/repositories/abstract/element-repository.interface'
import { UpdateElementService } from '../../element/update-element'
import { CreateComponentRequest } from './create-component.request'

/**
 * Facade over CreateElementService to create a basic Component
 */
@Injectable()
export class CreateComponentService
  implements UseCasePort<CreateComponentRequest, CreateResponse>
{
  constructor(
    @Inject(IElementRepositoryToken)
    private readonly elementRepository: IElementRepository,
    private getAtomService: GetAtomService,
    protected updateElementService: UpdateElementService,
  ) {}

  async execute(request: CreateComponentRequest): Promise<CreateResponse> {
    const { currentUser, input, transaction } = request
    const { foundAtom } = await this.validate(request)

    const element = createElement({
      name: input.name,
      parentElement: undefined,
      componentTag: undefined,
      instanceOfComponent: undefined,
      fixedId: v4(),
      props: { data: input.props ?? '{}' },
      atom: foundAtom,
      owner:
        !currentUser?.id || isAdmin(currentUser)
          ? undefined
          : { id: currentUser.id },
      css: undefined,
      propTransformationJs: undefined,
      renderForEachPropKey: undefined,
      renderIfPropKey: undefined,
      propMapBindings: [],
      hooks: [],
    })

    attachComponentTag(element, currentUser)

    return this.elementRepository.create(element, transaction)
  }

  protected async validate({ input: { atomId } }: CreateComponentRequest) {
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
