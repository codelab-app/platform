import { DgraphEntityType } from '../dgraph-entity-type'
import { DgraphQueryField } from './dgraph-query-field'
import { DgraphFilter, DgraphFilters, EqFilter } from './filters'
import {
  IBuildable,
  IDgraphQueryFilter,
  IQueryBuilder,
} from './i-query-builder'
import { compileMultiple } from './utils'

/**
 *  Right now there are a lot of moving parts here. It's mostly string concatenating, but if it comes to that we can optimize it by pre-compiling the queries and only substituting the filter at runtime. But I don't know if the performance benefit is enough to consider, maybe we can measure it vs just a regular string query if we need
 *
 *
 */

export class DgraphQueryBuilder implements IQueryBuilder {
  protected _queryName = 'query'

  public get queryName() {
    return this._queryName
  }

  protected _func?: Array<IDgraphQueryFilter>

  protected _directive: Array<string | IBuildable> = []

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
  setFunc(func: string | IDgraphQueryFilter | Array<IDgraphQueryFilter>) {
    if (typeof func === 'string') {
      return this.setFilterFuncString(func)
    }

    if (Array.isArray(func)) {
      return this.setFiltersFunc(func)
    }

    return this.setFilterFunc(func)
  }

  /**
   * The part after func:
   * Will override all previous func filters
   * @example
   * 'uid(x)'
   *  */
  setFilterFuncString(filterString: string) {
    this._func = [new DgraphFilter().withFilter(filterString)]

    return this
  }

  /** Will override all previous func filters */
  setFilterFunc(filter: IDgraphQueryFilter) {
    this._func = [filter]

    return this
  }

  /** Will override all previous func filters */
  setFiltersFunc(filters: Array<IDgraphQueryFilter>) {
    this._func = filters

    return this
  }

  addDirective(directive: string | IBuildable) {
    this._directive.push(directive)

    return this
  }

  addFilterDirective(filter: string | DgraphFilter | IBuildable) {
    this._directive.push(
      `@filter(${typeof filter === 'string' ? filter : filter.build()})`,
    )

    return this
  }

  addEqFilterDirective<TEntity extends any | unknown = unknown>(
    predicate: string,
    value: string,
  ) {
    return this.addFilterDirective(new EqFilter<TEntity>(predicate, value))
  }

  addTypeFilterDirective(typeName: DgraphEntityType) {
    return this.addFilterDirective(DgraphFilters.Type(typeName))
  }

  /** Will override all previous filters */
  setUidFunc(uid: string) {
    return this.setFilterFuncString(`uid(${uid})`)
  }

  /** Will override all previous func filters */
  setTypeFunc(type: DgraphEntityType) {
    return this.setFilterFuncString(`type(${type})`)
  }

  /** Will override all previous func filters */
  setUidsFunc(uids: Array<string>) {
    return this.setFilterFuncString(`uid(${uids.join(',')})`)
  }

  /** Adds @recurse directive to the query */
  addRecurseDirective() {
    return this.addDirective('@recurse')
  }

  /** Appends fields to the current field selection */
  addFields(...fields: Array<DgraphQueryField | string>) {
    for (const f of fields) {
      if (typeof f === 'object') {
        f.compile()
      }
    }

    this._fields.push(...fields)

    return this
  }

  /** Appends uid and dgraph.type to the current field selection */
  addBaseFields() {
    return this.addFields('uid', 'dgraph.type')
  }

  addExpandAll(fieldModifier?: (field: DgraphQueryField) => DgraphQueryField) {
    let field = new DgraphQueryField('expand(_all_)')

    if (fieldModifier) {
      field = fieldModifier(field)
    }

    return this.addFields(field)
  }

  addExpandType(type: DgraphEntityType | Array<DgraphEntityType>) {
    const typeArray = Array.isArray(type) ? type : [type]

    return this.addFields(...typeArray.map((typeItem) => `expand(${typeItem})`))
  }

  build(): string {
    if (!this._queryName) {
      throw new Error('Query name must be provided to query builder')
    }

    if (!this._func) {
      throw new Error('Func must be provided to query builder')
    }

    if (!this._fields || !this._fields.length) {
      throw new Error('Fields must be provided to query builder')
    }

    const fieldsSet = new Set(
      this._fields.map((f) => (typeof f === 'string' ? f : f.name)),
    )

    // Check if there are duplicate fields, otherwise it's very hard to track down the error dgraph gives you if there are duplicate fields
    if (Array.from(fieldsSet).length !== this.fields.length) {
      throw new Error('Duplicate field in query')
    }

    const fieldsString = compileMultiple(this._fields)

    // Remove the connection prefix from the first filter
    if (
      this._func &&
      this._func.length > 0 &&
      this._func[0] instanceof DgraphFilter
    ) {
      ;(this._func[0] as DgraphFilter).setConnectionPrefix(undefined)
    }

    const funcString = compileMultiple(this._func)

    const directiveString =
      this._directive && this._directive.length
        ? compileMultiple(this._directive)
        : undefined

    return `
       {
          ${this._queryName}(func: ${funcString}) ${directiveString || ''} {
              ${fieldsString}
          }
       }
    `
  }

  /** Builds the query to a string, same as .build() */
  toString() {
    return this.build()
  }

  static fieldsFromEnum(
    enums: Record<string, string>,
  ): Array<DgraphQueryField> {
    return Object.values(enums).map(
      (enumValue) => new DgraphQueryField(enumValue),
    )
  }
}
