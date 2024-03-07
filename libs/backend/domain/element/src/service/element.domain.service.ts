import { AtomDomainService } from '@codelab/backend/domain/atom'
import type { ICreateElementDto } from '@codelab/shared/abstract/core'
import { ROOT_ELEMENT_NAME } from '@codelab/shared/config'
import { Injectable } from '@nestjs/common'
import { v4 } from 'uuid'
import { ElementRepository } from '../repository'

@Injectable()
export class ElementDomainService {
  constructor(
    private elementRepository: ElementRepository,
    private atomDomainService: AtomDomainService,
  ) {}

  async createRootElement(
    dto: Omit<ICreateElementDto, 'name' | 'props' | 'renderType'>,
  ) {
    return this.elementRepository.add({
      ...dto,
      name: ROOT_ELEMENT_NAME,
      props: {
        data: '{}',
        id: v4(),
      },
      renderType: await this.atomDomainService.defaultRenderType(),
    })
  }
}
