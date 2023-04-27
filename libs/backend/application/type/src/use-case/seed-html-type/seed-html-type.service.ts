import { IAuthUseCase } from '@codelab/backend/abstract/types'
import { htmlAtomData } from '@codelab/shared/data/seed'
import htmlData from '../../../../../../../data/html/html.json'

interface HtmlSeed {
  attributes: Record<string, string>
  // attributes: Record<string, 'boolean' | 'integer' | 'string'>
  tag: string
}

export class SeedHtmlTypeService extends IAuthUseCase<void, void> {
  protected async _execute() {
    const htmls = htmlData as Array<HtmlSeed>

    // Get all items here
    for (const [atomType, atomData] of Object.entries(htmlAtomData)) {
      //
    }
  }
}
