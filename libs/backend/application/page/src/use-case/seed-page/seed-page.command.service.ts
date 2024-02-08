import { AtomDomainService } from '@codelab/backend/domain/atom'
import { PageRepository } from '@codelab/backend/domain/page'
import {
  type IElementDTO,
  IElementRenderTypeKind,
  type IPageDTO,
  IRenderPropType,
} from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { CommandHandler, type ICommandHandler } from '@nestjs/cqrs'
import { v4 } from 'uuid'

export class SeedPageCommand {
  constructor(public readonly page: Pick<IPageDTO, 'app' | 'id' | 'name'>) {}
}

/**
 * A page contains elements, and for seeding we don't want to worry about them, so we auto-create some defaults
 */
@CommandHandler(SeedPageCommand)
export class SeedPageHandler implements ICommandHandler<SeedPageCommand> {
  constructor(
    private readonly pageRepository: PageRepository,
    private atomDomainService: AtomDomainService,
  ) {}

  async execute(command: SeedPageCommand) {
    const { page } = command

    const rootElement: IElementDTO = {
      closestContainerNode: {
        id: page.id,
      },
      id: v4(),
      name: ROOT_ELEMENT_NAME,
      props: {
        data: '{}',
        id: v4(),
      },
      renderType: await this.atomDomainService.defaultRenderType(),
    }

    const pageDto: IPageDTO = {
      ...page,
      rootElement,
    }

    await this.pageRepository.add([pageDto])
  }
}
