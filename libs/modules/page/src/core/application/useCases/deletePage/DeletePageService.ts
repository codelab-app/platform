import { left, right } from 'fp-ts/Either'
import { isNone } from 'fp-ts/Option'
import { PageRepositoryPort } from '../../../adapters/PageRepositoryPort'
import { DeletePageErrors } from './DeletePageErrors'
import { DeletePageRequest } from './DeletePageRequest'
import { DeletePageResponse } from './DeletePageResponse'
import { DeletePageUseCase } from './DeletePageUseCase'
import { Result } from '@codelab/backend'

export class DeletePageService implements DeletePageUseCase {
  constructor(private readonly pageRepository: PageRepositoryPort) {}

  async execute(request: DeletePageRequest): Promise<DeletePageResponse> {
    const { pageId } = request

    const result = await this.pageRepository.delete(pageId)

    if (isNone(result)) {
      return left(new DeletePageErrors.PageNotFoundError(pageId))
    }

    return right(Result.ok(result.value))
  }
}
