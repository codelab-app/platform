import type {
  ICreateComponentData,
  ICreateElementData,
  IElementRenderTypeDto,
  IRef,
} from '@codelab/shared-abstract-core'

import { AtomDomainService } from '@codelab/backend-domain-atom'
import { ComponentRepository } from '@codelab/backend-domain-component'
import { ElementRepository } from '@codelab/backend-domain-element'
import { PropDomainService } from '@codelab/backend-domain-prop'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { LogClassMethod } from '@codelab/backend-infra-core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared-config-env'
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
    const startTime = Date.now()
    const caller = new Error().stack?.split('\n')[2]?.trim() || 'unknown'

    this.logger.log('ElementApplicationService.createElement started', {
      caller,
      closestContainerNode,
      element,
      elementId: element.id,
      elementName: element.name,
    })

    // const props = await this.propDomainService.createProp(element.propsData)
    const props = {
      data: JSON.stringify(element.propsData ?? {}),
      id: v4(),
    }

    let renderType: IElementRenderTypeDto
    const renderTypeStartTime = Date.now()

    if (element.atom) {
      this.logger.log('Looking up atom render type', {
        atomName: element.atom,
        elementId: element.id,
      })
      renderType = await this.atomDomainService.getRenderTypeByName(
        element.atom,
      )
    } else if (element.component) {
      this.logger.log('Looking up component render type', {
        componentKey: element.component,
        elementId: element.id,
      })
      renderType = await this.componentRepository.findOneOrFail({
        where: { compositeKey: element.component },
      })
    } else {
      this.logger.log('Using default render type', {
        elementId: element.id,
      })
      renderType = await this.atomDomainService.defaultRenderType()
    }

    this.logger.log('Render type lookup completed', {
      duration: Date.now() - renderTypeStartTime,
      elementId: element.id,
      renderTypeId: renderType.id,
    })

    const addStartTime = Date.now()

    const createdElement = await this.elementRepository.add({
      ...element,
      closestContainerNode: { id: closestContainerNode.id },
      parentElement: element.parentElement,
      props,
      renderType,
    })

    this.logger.log('Element added to repository', {
      duration: Date.now() - addStartTime,
      elementId: createdElement.id,
    })

    this.logger.log('ElementApplicationService.createElement completed', {
      elementId: createdElement.id,
      totalDuration: Date.now() - startTime,
    })

    return createdElement
  }

  async createElementTree(
    elements: Array<ICreateElementData>,
    parentElement: IRef,
  ) {
    const startTime = Date.now()

    this.logger.log('ElementApplicationService.createElementTree started', {
      elementCount: elements.length,
      parentElementId: parentElement.id,
    })

    for (const [index, element] of elements.entries()) {
      const elementStartTime = Date.now()

      await this.createElement(element, parentElement)
      this.logger.log('Tree element created', {
        duration: Date.now() - elementStartTime,
        elementId: element.id,
        index,
        totalElements: elements.length,
      })
    }

    this.logger.log('ElementApplicationService.createElementTree completed', {
      elementCount: elements.length,
      totalDuration: Date.now() - startTime,
    })
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
