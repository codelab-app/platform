import { JwtPayload } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { GetPageOwnerService } from '../../use-cases/get-page-owner/get-page-owner.service'

@Injectable()
export class PageGuardService {
  constructor(private getPageOwnerService: GetPageOwnerService) {}

  async validate(pageId: string, currentUser?: JwtPayload) {
    const page = await this.getPageOwnerService.execute({ pageId })

    if (!page) {
      throw new Error('Page does not exist')
    }

    if (page.ownerId !== currentUser?.sub) {
      throw new Error("You don't have access to this page")
    }
  }
}
