import { Mutation } from 'dgraph-js-http'
import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphTriple } from './dgraph-triple'
import { IQueryBuilder } from './i-query-builder'
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
  addTriple(...triples: Array<DgraphTriple>) {
    this._triples.push(...triples)

    return this
  }

  addDgraphTypeTriple(subject: string, dgraphType: DgraphEntityType) {
    return this.addTriple(new DgraphTriple(subject, 'dgraph.type', dgraphType))
  }

  build(): string {
    return compileMultiple(this._triples, { multiline: true })
  }

  buildSetMutation(): Mutation {
    return {
      setNquads: this.build(),
    }
  }
}
