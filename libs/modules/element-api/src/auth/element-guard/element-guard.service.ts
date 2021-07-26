import { JwtPayload } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
// shortened import causes circular reference and some weird shit happen
import { GetElementOwnerService } from '../../use-cases/get-element-owner/get-element-owner.service'

@Injectable()
/**
 * Validates that an element exists and that is owner by the current user
 */
export class ElementGuardService {
  constructor(private getElementOwnerService: GetElementOwnerService) {}

  async validate(elementId?: string, currentUser?: JwtPayload) {
    if (!elementId) {
      throw new Error('elementId not provided')
    }

    const response = await this.getElementOwnerService.execute({
      elementId,
    })

    if (!response || !response.element) {
      throw new Error('Element does not exist')
    }

    if (response.ownerId && response.ownerId !== currentUser?.sub) {
      throw new Error("You don't have access to this element")
    }

    return {
      element: response.element,
      ownerId: response.ownerId,
    }
  }
}
