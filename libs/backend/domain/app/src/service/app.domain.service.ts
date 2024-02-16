import { PageDomainService } from '@codelab/backend/domain/page'
import type { IAppDto } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { AppRepository } from '../repository'

@Injectable()
export class AppDomainService {
  constructor(
    private readonly appRepository: AppRepository,
    private readonly pageDomainService: PageDomainService,
  ) {}

  async createApp({ domains, id, name, owner }: IAppDto) {
    // await this.pageDomainService.createSystemPages({ id, name })

    return this.appRepository.add({
      domains,
      id,
      name,
      owner,
    })
  }
}
