import type { ICreatePageData } from '@codelab/frontend/abstract/domain'
import type { IAppDTO } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { PageRepository } from '../repository'

@Injectable()
export class PageDomainService {
  constructor(private pageRepository: PageRepository) {}

  private addPage(
    app: Pick<IAppDTO, 'name'>,
    { id, kind, name, url }: ICreatePageData,
  ) {
    //
  }
}
