import { UseCase } from '@codelab/backend'
import { Injectable } from '@nestjs/common'
import { GetPageElementService } from '../get-page-element/get-page-element.service'
import { ValidatePageElementInput } from './validate-page-element.input'

@Injectable()
export class ValidatePageElementService
  implements UseCase<ValidatePageElementInput, void>
{
  constructor(private getPageElementService: GetPageElementService) {}

  async execute({ parentPageElementId }: ValidatePageElementInput) {
    //ensure parentPageElementId exists and is a valid page element
    if (!parentPageElementId) {
      throw new Error('parentPageElementId not provided')
    }

    const parentPageElement = await this.getPageElementService.execute({
      pageElementId: parentPageElementId,
    })

    if (!parentPageElement) {
      throw new Error(`Can't find parent page element`)
    }
  }
}
