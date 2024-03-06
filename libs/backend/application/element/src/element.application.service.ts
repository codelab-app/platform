import { AtomDomainService } from '@codelab/backend/domain/atom'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropRepository } from '@codelab/backend/domain/prop'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
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
    private loggerService: CodelabLoggerService,
  ) {}

  async createElement(element: ICreateElementData, parentElement: IRef) {
    const props = await this.propRepository.add({
      data: JSON.stringify(element.propsData ?? {}),
      id: v4(),
    })

    const renderType = element.atom
      ? await this.atomDomainService.getRenderTypeByName(element.atom)
      : await this.atomDomainService.defaultRenderType()

    this.loggerService.log({ atom: element.atom, renderType }, 'Create element')

    return await this.elementRepository.add({
      ...element,
      closestContainerNode: { id: parentElement.id },
      parentElement: element.parentElement,
      props,
      renderType,
    })
  }

  async createElementTree(
    elements: Array<ICreateElementData>,
    parentElement: IRef,
  ) {
    for (const element of elements) {
      await this.createElement(element, parentElement)
    }
  }
}
