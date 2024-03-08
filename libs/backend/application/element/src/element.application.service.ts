import { AtomDomainService } from '@codelab/backend/domain/atom'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropDomainService, PropRepository } from '@codelab/backend/domain/prop'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import {
  IAtomType,
  type ICreateElementData,
  type IRef,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class ElementApplicationService {
  constructor(
    private elementRepository: ElementRepository,
    private atomDomainService: AtomDomainService,
    private loggerService: CodelabLoggerService,
    private propDomainService: PropDomainService,
  ) {}

  async createElement(element: ICreateElementData, closestContainerNode: IRef) {
    const props = await this.propDomainService.createProp(element.propsData)

    const renderType = element.atom
      ? await this.atomDomainService.getRenderTypeByName(element.atom)
      : await this.atomDomainService.defaultRenderType()

    this.loggerService.log({ atom: element.atom, renderType }, 'Create element')

    return await this.elementRepository.add({
      ...element,
      closestContainerNode: { id: closestContainerNode.id },
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

  async createRootElement(closestContainerNode: IRef) {
    const props = await this.propDomainService.createProp()

    const rootElement = await this.elementRepository.add({
      closestContainerNode,
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props,
      renderType: await this.atomDomainService.defaultRenderType(),
    })

    return rootElement
  }
}
