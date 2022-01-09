import { Maybe } from '@codelab/shared/abstract/types'
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

  constructor(name: Maybe<string> = undefined) {
    this._isDirty = true
    this._innerFields = []
    this._filters = []
    this._facets = []

    if (name) {
      this.setName(name)
    }
  }

  build() {
    if (this._isDirty || !this._compiledField) {
      this.compile()
    }

    return this._compiledField as string
  }

  /** Sets the field name */
  setName(fieldName: string) {
    this._isDirty = true
    this._fieldName = fieldName

    return this
  }

  /** appends the filters to the current filters array */
  addFilter(...filters: Array<IDgraphQueryFilter | string>) {
    this._isDirty = true
    this._filters.push(...filters)

    return this
  }

  /** Appends the facet to the current facet array */
  addFacet(facet: string) {
    this._isDirty = true
    this._facets.push(facet)

    return this
  }

  /** Appends the fields to the inner fields array */
  addInnerFields(...innerFields: Array<DgraphQueryField | string>) {
    this._isDirty = true
    this._innerFields.push(...innerFields)

    return this
  }

  /** Appends the base fields (uid, dgraph.type) to the inner fields array */
  addBaseInnerFields() {
    this._isDirty = true
    this._innerFields.push('uid', 'dgraph.type')

    return this
  }

  addExpandAll(fieldModifier?: (field: DgraphQueryField) => DgraphQueryField) {
    let field = new DgraphQueryField('expand(_all_)')

    if (fieldModifier) {
      field = fieldModifier(field)
    }

    return this.addInnerFields(field)
  }

  /** Alias for .addBaseInnerFields().addExpandAll(f => f.addBaseInnerFields().addExpandAll(f2 => f2.addBaseInnerFields().addExpandAll(...))) */
  addExpandAllRecursive(n: number): DgraphQueryField {
    if (n >= 1) {
      return this.addBaseInnerFields().addExpandAll((f) =>
        f.addExpandAllRecursive(n - 1),
      )
    }

    return this
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

  /** same as build */
  toString() {
    return this.build()
  }
}
