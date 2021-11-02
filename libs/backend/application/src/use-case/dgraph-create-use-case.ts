import { CreateResponsePort } from '@codelab/backend/abstract/core'
import { DgraphUseCase } from './dgraph-use-case'

/** Shorthand for creating a DgraphUseCase with a CreateResponse output */
export abstract class DgraphCreateUseCase<
  TUseCaseRequestPort,
> extends DgraphUseCase<TUseCaseRequestPort, CreateResponsePort> {}
