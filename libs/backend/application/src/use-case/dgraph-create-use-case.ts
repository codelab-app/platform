import { CreateResponse } from '../graphql'
import { DgraphUseCase } from './dgraph-use-case'

/** Shorthand for creating a DgraphUseCase with a CreateResponse output */
export abstract class DgraphCreateUseCase<
  TUseCaseRequestPort,
> extends DgraphUseCase<TUseCaseRequestPort, CreateResponse> {}
