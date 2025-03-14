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
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { LogClassMethod } from '@codelab/backend/infra/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config/env'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'

@Injectable()
export class ElementApplicationService {
  constructor(
    private elementRepository: ElementRepository,
    private atomDomainService: AtomDomainService,
    private componentRepository: ComponentRepository,
    private logger: PinoLoggerService,
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

  @LogClassMethod()
  async createElement(element: ICreateElementData, closestContainerNode: IRef) {
    console.log('element', element)
    console.log('closestContainerNode', closestContainerNode)

    // const props = await this.propDomainService.createProp(element.propsData)
    const props = {
      data: JSON.stringify(element.propsData ?? {}),
      id: v4(),
    }

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

    this.logger.debug('Create element', {
      data: { atom: element.atom, renderType },
    })

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
