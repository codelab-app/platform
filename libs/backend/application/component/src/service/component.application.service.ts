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
import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { IElementRenderTypeKind, IRole } from '@codelab/shared/abstract/core'
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
    private logger: PinoLoggerService,
  ) {}

  async createComponent(createComponentData: ICreateComponentData) {
    this.logger.debug('createComponent', {
      context: 'Create Component Data',
      data: createComponentData,
    })

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
