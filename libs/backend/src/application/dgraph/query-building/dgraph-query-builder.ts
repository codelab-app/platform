import { baseFields } from './base-dgraph-fields'
import { DgraphModelMetadata } from './dgraph.model'
import { DgraphQueryField } from './dgraph-query-field'
import { DgraphFilter } from './filters'
import { IDgraphQueryFilter, IQueryBuilder } from './i-query-builder'
import { compileMultiple } from './utils'

// Right now there are a lot of moving parts here
// It's mostly string concatenating, but if it comes to that
// we can optimize it by pre-compiling the queries and only substituting the filter at
// runtime. But I don't know if the performance benefit is enough to consider,
// maybe we can measure it vs just a regular string query if we need
export class DgraphQueryBuilder implements IQueryBuilder {
  protected _queryName = 'query'

  protected _func?: Array<IDgraphQueryFilter>

  protected _directive?: string

  protected _fields: Array<DgraphQueryField | string>

  constructor() {
    this._fields = []
  }

  public getField(name: string): DgraphQueryField | undefined {
    return this._fields.find(
      (f): f is DgraphQueryField => typeof f === 'object' && f.name == name,
    )
  }

  public get fields() {
    return this._fields
  }

  withQueryName(queryName: string) {
    this._queryName = queryName

    return this
  }

  /** Sets the func to a new value */
  withFunc(func: string | IDgraphQueryFilter | Array<IDgraphQueryFilter>) {
    if (typeof func === 'string') {
      return this.withFilterFuncString(func)
    }

    if (Array.isArray(func)) {
      return this.withFiltersFunc(func)
    }

    return this.withFilterFunc(func)
  }

  withFilterFuncString(filterString: string) {
    this._func = [new DgraphFilter().withFilter(filterString)]

    return this
  }

  withFilterFunc(filter: IDgraphQueryFilter) {
    this._func = [filter]

    return this
  }

  withFiltersFunc(filters: Array<IDgraphQueryFilter>) {
    this._func = filters

    return this
  }

  withDirective(directive: string) {
    this._directive = directive

    return this
  }

  withUidFunc(uid: string) {
    return this.withFilterFuncString(`uid(${uid})`)
  }

  withUidsFunc(uids: Array<string>) {
    return this.withFilterFuncString(`uid(${uids.join(',')})`)
  }

  withRecurse() {
    return this.withDirective('@recurse')
  }

  /** Appends fields to the current field selection */
  withFields(...fields: Array<DgraphQueryField | string>) {
    for (const f of fields) {
      if (typeof f === 'object') {
        f.compile()
      }
    }

    this._fields.push(...fields)

    return this
  }

  /** Appends the fields of a model (or models) to the field selection */
  withModelFields(
    ...modelClasses: Array<{ Metadata: DgraphModelMetadata<string> }>
  ) {
    //That's an ugly version of flatMap
    return this.withFields(
      ...modelClasses.reduce((prev: Array<DgraphQueryField>, modelClass) => {
        prev.push(...modelClass.Metadata.queryFields())

        return prev
      }, []),
    )
  }

  /** Appends @see{@link BaseDgraphFields} to the current field selection */
  withBaseFields() {
    return this.withFields(...baseFields)
  }

  build(): string {
    if (!this._queryName) {
      throw new Error('Query name must be provided')
    }

    if (!this._func) {
      throw new Error('Func must be provided')
    }

    if (!this._fields || !this._fields.length) {
      throw new Error('Fields must be provided')
    }

    const fieldsString = compileMultiple(this._fields)
    const funcString = compileMultiple(this._func)

    return `
       {
          ${this._queryName}(func: ${funcString}) ${this._directive || ''} {
              ${fieldsString}
          }
       }
    `
  }

  static fieldsFromEnum(
    enums: Record<string, string>,
  ): Array<DgraphQueryField> {
    return Object.values(enums).map(
      (enumValue) => new DgraphQueryField(enumValue),
    )
  }
}
