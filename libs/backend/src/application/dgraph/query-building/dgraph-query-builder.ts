import { IQueryBuilder } from './i-query-builder'

export class DgraphQueryBuilder implements IQueryBuilder {
  protected queryName = 'query'

  protected func?: string

  protected directive?: string

  protected fields?: string

  withQueryName(queryName: string) {
    this.queryName = queryName

    return this
  }

  withFunc(func: string) {
    this.func = func

    return this
  }

  withDirective(directive: string) {
    this.directive = directive

    return this
  }

  withUid(uid: string) {
    return this.withFunc(`uid(${uid})`)
  }

  withRecurse() {
    return this.withDirective('@recurse')
  }

  /** Appends fields to the current field selection */
  withFields(fields: string) {
    this.fields = `
      ${this.fields || ''}
      ${fields || ''}
    `

    return this
  }

  build(): string {
    if (!this.queryName) {
      throw new Error('Query name must be provided')
    }

    if (!this.func) {
      throw new Error('Func must be provided')
    }

    if (!this.fields) {
      throw new Error('Fields must be provided')
    }

    return `
       {
          ${this.queryName}(func: ${this.func}) ${this.directive || ''} {
              ${this.fields}
          }
       }
    `
  }
}
