import type {
  IComponentAggregateExport,
  IComponentDto,
  ICreateComponentData,
  IInterfaceTypeDto,
  IStoreDto,
} from '@codelab/shared/abstract/core'

import { ElementApplicationService } from '@codelab/backend/application/element'
import { StoreApplicationService } from '@codelab/backend/application/store'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { PropDomainService } from '@codelab/backend/domain/prop'
import { AuthDomainService } from '@codelab/backend/domain/shared/auth'
import { Store } from '@codelab/backend/domain/store'
import {
  InterfaceType,
  InterfaceTypeRepository,
} from '@codelab/backend/domain/type'
import {
  IElementRenderTypeKind,
  IRole,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { interfaceTypeDtoFactory } from '@codelab/shared-domain-module/type'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { v4 } from 'uuid'

import { ExportComponentCommand } from '../use-case'

@Injectable()
export class ComponentApplicationService {
  constructor(
    private authDomainService: AuthDomainService,
    private componentRepository: ComponentRepository,
    private commandBus: CommandBus,
    private storeApplicationService: StoreApplicationService,
    private elementApplicationService: ElementApplicationService,
    private propDomainService: PropDomainService,
    private interfaceTypeRepository: InterfaceTypeRepository,
  ) {}

  async createComponent(createComponentData: ICreateComponentData) {
    const owner = this.authDomainService.currentUser

    const api: IInterfaceTypeDto = interfaceTypeDtoFactory({
      id: v4(),
      name: InterfaceType.createName(`${createComponentData.name} Store`),
      owner,
    })

    const createdApi = await this.interfaceTypeRepository.add(api)

    const storeDto: IStoreDto = {
      api: createdApi,
      id: v4(),
      name: Store.createName({ name: createComponentData.name }),
    }

    const store = await this.storeApplicationService.createStoreAggregate(
      storeDto,
      api,
    )

    const props = await this.propDomainService.createProp()

    const rootElement =
      await this.elementApplicationService.createComponentRootElement(
        createComponentData,
      )

    const componentDto: IComponentDto = {
      ...createComponentData,
      __typename: IElementRenderTypeKind.Component,
      api: createdApi,
      owner,
      props,
      rootElement,
      store,
    }

    await this.componentRepository.add(componentDto)

    return this.componentRepository.findOneOrFail({
      where: { id: componentDto.id },
    })
  }

  /**
   * Export all components owned by admins
   */
  async exportComponentsForAdmin(): Promise<Array<IComponentAggregateExport>> {
    const components = await this.componentRepository.find({
      where: {
        owner: {
          roles_INCLUDES: IRole.Admin,
        },
      },
    })

    const results: Array<IComponentAggregateExport> = []

    for (const component of components) {
      const result = await this.commandBus.execute<
        ExportComponentCommand,
        IComponentAggregateExport
      >(new ExportComponentCommand(component.id))

      results.push(result)
    }

    return results
  }
}
