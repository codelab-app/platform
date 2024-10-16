import type {
  ICreateComponentData,
  ICreateElementData,
  IElementRenderTypeDto,
  IRef,
} from '@codelab/shared/abstract/core'

import { AtomDomainService } from '@codelab/backend/domain/atom'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { PropDomainService } from '@codelab/backend/domain/prop'
import { CodelabLoggerService } from '@codelab/backend/infra/adapter/logger'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class ElementApplicationService {
  constructor(
    private elementRepository: ElementRepository,
    private atomDomainService: AtomDomainService,
    private componentRepository: ComponentRepository,
    private loggerService: CodelabLoggerService,
    private propDomainService: PropDomainService,
  ) {}

  async createComponentRootElement(component: ICreateComponentData) {
    return this.createElement(
      {
        id: v4(),
        name: `${component.name} Root`,
      },
      { id: component.id },
    )
  }

  async createElement(element: ICreateElementData, closestContainerNode: IRef) {
    const props = await this.propDomainService.createProp(element.propsData)
    let renderType: IElementRenderTypeDto

    if (element.atom) {
      renderType = await this.atomDomainService.getRenderTypeByName(
        element.atom,
      )
    } else if (element.component) {
      renderType = await this.componentRepository.findOneOrFail({
        where: { compositeKey: element.component },
      })
    } else {
      renderType = await this.atomDomainService.defaultRenderType()
    }

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

  async createPageRootElement(closestContainerNode: IRef) {
    return this.createElement(
      {
        id: v4(),
        name: ROOT_ELEMENT_NAME,
      },
      closestContainerNode,
    )
  }
}
