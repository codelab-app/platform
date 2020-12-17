import { VertexRepositoryPort } from '../../adapters/VertexRepositoryPort'
import { CreateVertexRequest } from '../useCases/createVertex/CreateVertexRequest'
import { CreateVertexResponse } from '../useCases/createVertex/CreateVertexResponse'
import { CreateVertexUseCase } from '../useCases/createVertex/CreateVertexUseCase'

export class CreateVertexService implements CreateVertexUseCase {
  constructor(private readonly userRepository: VertexRepositoryPort) {}

  execute(request: CreateVertexRequest): Promise<CreateVertexResponse> {
    // return Promise.resolve(undefined);
    return Promise.reject()
  }
}
