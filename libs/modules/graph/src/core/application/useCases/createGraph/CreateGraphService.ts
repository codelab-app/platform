import { left, right } from 'fp-ts/Either'
import { isNone } from 'fp-ts/Option'
import { GraphRepositoryPort } from '../../../adapters/GraphRepositoryPort'
import { CreateGraphErrors } from './CreateGraphErrors'
import { CreateGraphRequest } from './CreateGraphRequest'
import { CreateGraphResponse } from './CreateGraphResponse'
import { CreateGraphUseCase } from './CreateGraphUseCase'
import { Result } from '@codelab/backend'

export class CreateGraphService implements CreateGraphUseCase {
  constructor(private readonly graphRepository: GraphRepositoryPort) {}

  async execute(request: CreateGraphRequest): Promise<CreateGraphResponse> {
    const newGraph = await this.graphRepository.create(request)

    if (isNone(newGraph)) {
      return left(new CreateGraphErrors.DemoError(''))
    }

    return right(Result.ok(newGraph.value))
  }
}
