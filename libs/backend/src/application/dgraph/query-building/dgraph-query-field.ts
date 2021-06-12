import { baseFields } from './base-dgraph-fields'
import { IBuildable, IDgraphQueryFilter } from './i-query-builder'
import { compileMultiple } from './utils'

export class DgraphQueryField implements IBuildable {
  protected _compiledField?: string

  protected _isDirty: boolean

  protected _fieldName?: string

  protected _innerFields: Array<DgraphQueryField | string>

  protected _filters: Array<IDgraphQueryFilter>

  protected _facets: Array<string>

  constructor(name: string | undefined = undefined) {
    this._isDirty = true
    this._innerFields = []
    this._filters = []
    this._facets = []

    if (name) {
      this.withName(name)
    }
  }

  build() {
    if (this._isDirty || !this._compiledField) {
      this.compile()
    }

    return this._compiledField as string
  }

  withName(fieldName: string) {
    this._isDirty = true
    this._fieldName = fieldName

    return this
  }

  /** appends the filters to the current filters array */
  withFilters(...filters: Array<IDgraphQueryFilter>) {
    this._isDirty = true
    this._filters.push(...filters)

    return this
  }

  /** Appends the facet to the current facet array */
  withFacet(facet: string) {
    this._isDirty = true
    this._facets.push(facet)

    return this
  }

  /** Appends the fields to the inner fields array */
  withInnerFields(...innerFields: Array<DgraphQueryField | string>) {
    this._isDirty = true
    this._innerFields.push(...innerFields)

    return this
  }

  /** Appends the base fields (uid, dgrpah.type) to the inner fields array */
  withBaseInnerFields() {
    this._isDirty = true
    this._innerFields.push(...baseFields)

    return this
  }

  compile() {
    if (!this._isDirty && this._compiledField) {
      return this._compiledField
    }

    if (!this._fieldName) {
      throw new Error("Can't build dgraph field, no field name provided")
    }

    const innerFieldsString = compileMultiple(this._innerFields, '{', '}')
    const filtersString = compileMultiple(this._filters, '@filter(', ')')
    const facetsString = compileMultiple(this._facets, '@facets(', ')')

    this._compiledField = `${this._fieldName} ${filtersString} ${facetsString} ${innerFieldsString}`
    this._isDirty = false
  }
}
