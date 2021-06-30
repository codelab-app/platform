import { baseFields } from './base-dgraph-fields'
import { DgraphModelMetadata } from './dgraph.model'
import { IBuildable, IDgraphQueryFilter } from './i-query-builder'
import { compileMultiple } from './utils'

export class DgraphQueryField implements IBuildable {
  protected _compiledField?: string

  protected _isDirty: boolean

  protected _fieldName?: string

  public get name() {
    return this._fieldName
  }

  protected _innerFields: Array<DgraphQueryField | string>

  protected _filters: Array<IDgraphQueryFilter | string>

  protected _facets: Array<string>

  public clone() {
    const newField = new DgraphQueryField()
    newField._isDirty = true
    newField._fieldName = this._fieldName
    newField._innerFields = this._innerFields.map((f) =>
      typeof f === 'object' ? f.clone() : f,
    )
    newField._filters = this._filters
    newField._facets = this._facets

    return newField
  }

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
  withFilters(...filters: Array<IDgraphQueryFilter | string>) {
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

  /** Appends the fields of a model (or models) to the field selection */
  withModelInnerFields(
    ...modelClasses: Array<{ Metadata: DgraphModelMetadata<string> }>
  ) {
    // That's an ugly version of flatMap
    return this.withInnerFields(
      ...modelClasses.reduce((prev: Array<DgraphQueryField>, modelClass) => {
        prev.push(...modelClass.Metadata.queryFields())

        return prev
      }, []),
    )
  }

  compile() {
    if (!this._isDirty && this._compiledField) {
      return this._compiledField
    }

    if (!this._fieldName) {
      throw new Error("Can't build dgraph field, no field name provided")
    }

    const innerFieldsString = compileMultiple(this._innerFields, {
      prefix: '{',
      postfix: '}',
    })

    const filtersString = compileMultiple(this._filters, {
      prefix: '@filter(',
      postfix: ')',
    })

    const facetsString = compileMultiple(this._facets, {
      prefix: '@facets(',
      postfix: ')',
    })

    this._compiledField = `${this._fieldName} ${filtersString} ${facetsString} ${innerFieldsString}`
    this._isDirty = false

    return
  }
}
