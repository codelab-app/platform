import { IBuildable } from './i-query-builder'

export type TripleValue = string | boolean | number | IBuildable

export class DgraphTriple implements IBuildable {
  protected _subject: string | IBuildable

  public get subject() {
    return this._subject
  }

  protected _predicate: string | IBuildable

  public get predicate() {
    return this._predicate
  }

  protected _value: TripleValue

  public get value() {
    return this._value
  }

  protected _facet?: string | IBuildable

  public get facet() {
    return this._facet
  }

  protected _skip = false

  constructor(
    subject: string | IBuildable,
    predicate: string | IBuildable,
    value: TripleValue,
    facet?: string | IBuildable,
  ) {
    this._subject = subject
    this._predicate = predicate
    this._value = value
    this._facet = facet
  }

  static fromPredicateValuePairs(
    subject: string | IBuildable,
    predicateValuePairs: Record<string, TripleValue>,
  ) {
    return Object.keys(predicateValuePairs).map((predicate) => {
      const value = predicateValuePairs[predicate]

      return new DgraphTriple(subject, predicate, value)
    })
  }

  static fromPredicateValueArray(
    subject: string,
    predicateValuePairs: Array<{ predicate: string; value: TripleValue }>,
  ) {
    return predicateValuePairs.map(
      ({ predicate, value }) => new DgraphTriple(subject, predicate, value),
    )
  }

  setSubject(subject: string) {
    this._subject = subject

    return this
  }

  setPredicate(predicate: string) {
    this._predicate = predicate

    return this
  }

  setValue(value: string | null | undefined) {
    this._value = value || ''

    return this
  }

  /** Build this triple only if this condition is truthy, will build an empty string otherwise */
  onlyIf(condition: any) {
    this._skip = !condition

    return this
  }

  private getValueString(): string {
    switch (typeof this._value) {
      case 'number':
      case 'boolean':
        return `"${this._value.toString()}"`
      case 'object':
        return this._value.build()
      default:
        if (
          this._value.startsWith('"') ||
          this._value.startsWith('_:') ||
          this._value.endsWith(')') ||
          this._value == '*'
        ) {
          return this._value
        }

        if (this._value.startsWith('0x')) {
          return `<${this._value}>`
        }

        return `"${this._value}"`
    }
  }

  private getSubjectString(): string {
    switch (typeof this._subject) {
      case 'object':
        return this._subject.build()
      default:
        if (this._subject.startsWith('0x')) {
          return `<${this._subject}>`
        }

        return this._subject
    }
  }

  private getFacetString(): string {
    if (!this.facet) {
      return ''
    }

    switch (typeof this.facet) {
      case 'object':
        return this.facet.build()
      default:
        return this.facet
    }
  }

  private getPredicateString() {
    return this._predicate === '*' ? this._predicate : `<${this._predicate}>`
  }

  build(): string {
    if (this._skip) {
      return ''
    }

    const value = this.getValueString()
    const subject = this.getSubjectString()
    const predicate = this.getPredicateString()
    const facet = this.getFacetString()

    return `${subject} ${predicate} ${value} ${facet} .`
  }
}
