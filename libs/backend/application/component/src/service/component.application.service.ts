import type {
  ComponentUniqueWhere,
  ComponentWhere,
} from '@codelab/backend/abstract/codegen'
import type { IComponentOutputDto } from '@codelab/backend/abstract/core'
import { ComponentRepository } from '@codelab/backend/domain/component'
import { ElementRepository } from '@codelab/backend/domain/element'
import { type IAuth0User, IRole } from '@codelab/shared/abstract/core'
import { Span } from '@codelab/shared/infra/otel'
import { Injectable } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { ExportComponentCommand } from '../use-case'

@Injectable()
export class ComponentApplicationService {
  constructor(
    private componentRepository: ComponentRepository,
    private commandBus: CommandBus,
  ) {}

  /**
   * Export all components owned by admins
   */
  @Span()
  async exportComponentsForAdmin(): Promise<Array<IComponentOutputDto>> {
    const components = await this.componentRepository.find({
      options: {
        limit: 1,
      },
      where: {
        owner: {
          roles_INCLUDES: IRole.Admin,
        },
      },
    })

    const results: Array<IComponentOutputDto> = []

    for (const component of components) {
      const result = await this.commandBus.execute<
        ExportComponentCommand,
        IComponentOutputDto
      >(new ExportComponentCommand(component.id))

      results.push(result)
    }

    return results
  }
}
