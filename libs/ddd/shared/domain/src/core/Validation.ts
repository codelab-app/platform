export class Validation {
  validate(data: any) {
    const { error, value } = this.rules.validate({ a: 'a string' })
  }
}
