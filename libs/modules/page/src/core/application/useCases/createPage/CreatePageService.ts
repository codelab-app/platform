import { left, right } from 'fp-ts/Either'
import { isNone } from 'fp-ts/Option'
import { PageRepositoryPort } from '../../../adapters/PageRepositoryPort'
import { CreatePageErrors } from './CreatePageErrors'
import { CreatePageRequest } from './CreatePageRequest'
import { CreatePageResponse } from './CreatePageResponse'
import { CreatePageUseCase } from './CreatePageUseCase'
import { Result } from '@codelab/backend'

export class CreatePageService implements CreatePageUseCase {
  constructor(private readonly pageRepository: PageRepositoryPort) {}

  async execute({
    appId,
    title,
  }: CreatePageRequest): Promise<CreatePageResponse> {
    const page = await this.pageRepository.create({ title }, appId)

    if (isNone(page)) {
      return left(new CreatePageErrors.AppNotFoundError(appId))
    }

    return right(Result.ok(page.value))
  }
}
