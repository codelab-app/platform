import type {
  IComponentAggregate,
  IComponentDto,
  IComponentType,
  ICreateComponentData,
  IInterfaceTypeDto,
  IStoreDto,
} from '@codelab/shared-abstract-core'

import { ReadAdminDataService } from '@codelab/backend-application-data'
import { ElementApplicationService } from '@codelab/backend-application-element'
import { StoreApplicationService } from '@codelab/backend-application-store'
import { TypeApplicationService } from '@codelab/backend-application-type'
import { ComponentRepository } from '@codelab/backend-domain-component'
import { ElementRepository } from '@codelab/backend-domain-element'
import { AuthDomainService } from '@codelab/backend-domain-shared-auth'
import { Store } from '@codelab/backend-domain-store'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend-domain-type'
import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { IElementRenderTypeKind, IRole } from '@codelab/shared-abstract-core'
import { interfaceTypeDtoFactory } from '@codelab/shared-domain-module-type'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { v4 } from 'uuid'

import { ExportComponentCommand } from '../use-case'

@Injectable()
export class ComponentApplicationService {
  constructor(
    private readonly readAdminDataService: ReadAdminDataService,
    private authDomainService: AuthDomainService,
    private componentRepository: ComponentRepository,
    private commandBus: CommandBus,
    private storeApplicationService: StoreApplicationService,
    private elementApplicationService: ElementApplicationService,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private typeApplicationService: TypeApplicationService,
    private logger: PinoLoggerService,
    private elementRepository: ElementRepository,
  ) {}

  /**
   * Empty means import all
   */
  async addComponents(componentsData: Array<IComponentAggregate>) {
    const startTime = Date.now()
    const apis = componentsData.flatMap(({ api }) => api)
    const components = componentsData.flatMap(({ component }) => component)

    const elements = componentsData.flatMap(
      ({ elements: _elements }) => _elements,
    )

    const stores = componentsData.flatMap(({ store }) => store)
    const totalFields = apis.reduce((sum, api) => sum + api.fields.length, 0)

    this.logger.log('ComponentApplicationService.addComponents started', {
      apisCount: apis.length,
      componentNames: components.map((comp) => comp.name),
      componentsCount: componentsData.length,
      context: 'ImportComponentsHandler',
      elementsCount: elements.length,
      storesCount: stores.length,
      totalFields,
    })

    const apisStartTime = Date.now()

    await this.typeApplicationService.addApis(apis)
    this.logger.log('APIs added', {
      apisCount: apis.length,
      duration: Date.now() - apisStartTime,
      totalFields,
    })

    const storesStartTime = Date.now()

    await this.storeApplicationService.addStores(stores)
    this.logger.log('Stores added', {
      duration: Date.now() - storesStartTime,
      storesCount: stores.length,
    })

    const elementsStartTime = Date.now()

    for (const [index, element] of elements.entries()) {
      await this.elementRepository.add(element)

      if (index % 10 === 0) {
        this.logger.log('Elements progress', {
          processed: index + 1,
          total: elements.length,
        })
      }
    }

    this.logger.log('Elements added', {
      duration: Date.now() - elementsStartTime,
      elementsCount: elements.length,
    })

    const componentsStartTime = Date.now()

    await this.componentRepository.addMany(
      components.map((component) => ({
        ...component,
        owner: this.authDomainService.currentUser,
      })),
    )
    this.logger.log('Components added to repository', {
      componentsCount: components.length,
      duration: Date.now() - componentsStartTime,
    })

    this.logger.log('ComponentApplicationService.addComponents completed', {
      totalDuration: Date.now() - startTime,
    })
  }

  /**
   * Undefined means import all components
   */
  async addComponentsFromTypes(componentTypes?: Array<IComponentType>) {
    const componentsData = componentTypes
      ? this.readAdminDataService.getComponentsByNames(componentTypes)
      : this.readAdminDataService.components

    return await this.addComponents(componentsData)
  }

  async createComponent(createComponentData: ICreateComponentData) {
    const owner = this.authDomainService.currentUser

    if (owner.id !== createComponentData.owner.id) {
      throw new Error('Owner does not match')
    }

    const api: IInterfaceTypeDto = interfaceTypeDtoFactory({
      id: v4(),
      name: InterfaceType.createName(`${createComponentData.name} Store`),
      owner,
    })

    const storeDto: IStoreDto = {
      api,
      id: v4(),
      name: Store.createName({ name: createComponentData.name }),
    }

    const store = await this.storeApplicationService.createStoreAggregate(
      storeDto,
      api,
    )

    const props = {
      data: '{}',
      id: v4(),
    }

    const rootElement =
      await this.elementApplicationService.createComponentRootElement(
        createComponentData,
      )

    const componentDto: IComponentDto = {
      ...createComponentData,
      __typename: IElementRenderTypeKind.Component,
      api,
      owner,
      props,
      rootElement,
      store,
    }

    const found = await this.interfaceTypeRepository.findOne({
      where: { id: api.id },
    })

    if (!found) {
      throw new Error('Interface type not found')
    }

    await this.componentRepository.add(componentDto)

    return this.componentRepository.findOneOrFail({
      where: { id: componentDto.id },
    })
  }

  /**
   * Export all components owned by admins
   */
  async exportComponentsForAdmin(): Promise<Array<IComponentAggregate>> {
    const components = await this.componentRepository.find({
      where: {
        owner: {
          roles_INCLUDES: IRole.Admin,
        },
      },
    })

    const results: Array<IComponentAggregate> = []

    for (const component of components) {
      const result = await this.commandBus.execute<
        ExportComponentCommand,
        IComponentAggregate
      >(new ExportComponentCommand(component.id))

      results.push(result)
    }

    return results
  }

  /**
   * Empty means import all
   */
  async saveComponents(components: Array<IComponentAggregate>) {
    this.logger.log('ComponentApplicationService.saveComponents', {
      compoenntCount: components.length,
    })

    // First, process all atoms without dependencies in parallel
    await Promise.all(
      components.map(async ({ api, component, elements, store }, index) => {
        await this.typeApplicationService.saveApi(api)
        await this.storeApplicationService.saveStore(store)

        await Promise.all(
          elements.map((element) => this.elementRepository.save(element)),
        )

        await this.componentRepository.save({
          ...component,
          owner: this.authDomainService.currentUser,
        })
      }),
    )
  }
}
