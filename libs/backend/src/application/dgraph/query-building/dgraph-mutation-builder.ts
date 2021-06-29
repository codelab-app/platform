import { Mutation } from 'dgraph-js'
import { BaseDgraphFields } from './base-dgraph-fields'
import { DgraphModelMetadata } from './dgraph.model'
import { DgraphTriple } from './dgraph-triple'
import { IBuildable, IQueryBuilder } from './i-query-builder'
import { compileMultiple } from './utils'

export class DgraphMutationBuilder implements IQueryBuilder {
  private readonly _triples: Array<DgraphTriple>

  public triples() {
    return [...this._triples]
  }

  constructor() {
    this._triples = []
  }

  /** Appends the triples to the current triples array */
  withTriple(...triples: Array<DgraphTriple>) {
    this._triples.push(...triples)

    return this
  }

  withDgraphType(subject: string, dgraphType: string) {
    return this.withTriple(
      new DgraphTriple(subject, BaseDgraphFields.DgraphType, dgraphType),
    )
  }

  withDgraphTypeModel(
    subject: string | IBuildable,
    dgraphModel: { Metadata: DgraphModelMetadata<any> },
  ) {
    return this.withTriple(DgraphTriple.dgraphTypeModel(subject, dgraphModel))
  }

  build(): string {
    return compileMultiple(this._triples, { multiline: true })
  }

  buildMutation() {
    const mu = new Mutation()
    mu.setSetNquads(this.build())

    return mu
  }
}
