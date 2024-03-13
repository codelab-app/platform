import { ElementApplicationService } from '@codelab/backend/application/element'
import { StoreApplicationService } from '@codelab/backend/application/store'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { PropDomainService } from '@codelab/backend/domain/prop'
import { Store } from '@codelab/backend/domain/store'
import { InterfaceType } from '@codelab/backend/domain/type'
import type {
  IComponentAggregate,
  IComponentDto,
  ICreateComponentData,
  ICreateInterfaceTypeDto,
  IStoreDto,
} from '@codelab/shared/abstract/core'
import { IRole } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { v4 } from 'uuid'
import { ExportComponentCommand } from '../use-case'

@Injectable()
export class ComponentApplicationService {
  constructor(
    private componentRepository: ComponentRepository,
    private commandBus: CommandBus,
    private storeApplicationService: StoreApplicationService,
    private elementApplicationService: ElementApplicationService,
    private propDomainService: PropDomainService,
  ) {}

  async createComponent(createComponentData: ICreateComponentData) {
    const api: ICreateInterfaceTypeDto = {
      id: v4(),
      name: InterfaceType.createName(`${createComponentData.name} Store`),
    }

    const storeDto: IStoreDto = {
      api,
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
      api,
      childrenContainerElement: rootElement,
      props,
      rootElement,
      store,
    }

    const component = await this.componentRepository.add(componentDto)

    return component
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
}
