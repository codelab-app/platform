import { AtomDomainService } from '@codelab/backend/domain/atom'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import {
  type ICreateElementData,
  type IElementDto,
  IElementRenderTypeKind,
  type IRef,
} from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class ElementApplicationService {
  constructor(
    private elementRepository: ElementRepository,
    private atomDomainService: AtomDomainService,
    private propRepository: PropRepository,
  ) {}

  async createElement(element: ICreateElementData, parentElement: IRef) {
    const props = await this.propRepository.add({
      data: JSON.stringify(element.propsData ?? {}),
      id: v4(),
    })

    return await this.elementRepository.add({
      ...element,
      closestContainerNode: { id: parentElement.id },
      id: v4(),
      parentElement: { id: element.parentElement },
      props,
      renderType: await this.atomDomainService.defaultRenderType(),
    })
  }

  async createElementTree(
    elements: Array<ICreateElementData>,
    parentElement: IRef,
  ) {
    for (const element of elements) {
      await this.elementRepository.add({
        ...element,
        closestContainerNode: { id: parentElement.id },
        id: v4(),
        parentElement: { id: element.parentElement },
        props: {
          api: { id: v4() },
          data: JSON.stringify(element.propsData ?? {}),
          id: v4(),
        },
        renderType: await this.atomDomainService.defaultRenderType(),
      })
    }
  }
}
