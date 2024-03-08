import { ElementApplicationService } from '@codelab/backend/application/element'
import { PageRepository } from '@codelab/backend/domain/page'
import { StoreDomainService } from '@codelab/backend/domain/store'
import type { ICreatePageDto, IPageDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PageApplicationService {
  constructor(
    private pageRepository: PageRepository,
    private elementApplicationService: ElementApplicationService,
    private storeDomainService: StoreDomainService,
  ) {}

  async createPage(createPageDto: ICreatePageDto) {
    const rootElement = await this.elementApplicationService.createRootElement({
      id: createPageDto.id,
    })

    const pageStore = await this.storeDomainService.create()

    return this.pageRepository.add({ ...createPageDto, rootElement })
  }
}
