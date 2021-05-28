import { JwtPayload } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
//shortened import causes circular reference and some weird shit happen
import { GetPageElementOwnerService } from '../../use-cases/get-page-element-owner/get-page-element-owner.service'

@Injectable()
/**
 * Validates that a page element exists and that is owner by the current user
 */
export class PageElementGuardService {
  constructor(private getPageElementOwnerService: GetPageElementOwnerService) {}

  async validate(pageElementId?: string, currentUser?: JwtPayload) {
    if (!pageElementId) {
      throw new Error('pageElementId not provided')
    }

    const response = await this.getPageElementOwnerService.execute({
      pageElementId,
    })

    if (!response || !response.pageElement || !response.ownerId) {
      throw new Error('Page element does not exist')
    }

    if (response.ownerId !== currentUser?.sub) {
      throw new Error("You don't have access to this page element")
    }

    return {
      pageElement: response.pageElement,
      ownerId: response.ownerId,
    }
  }
}
