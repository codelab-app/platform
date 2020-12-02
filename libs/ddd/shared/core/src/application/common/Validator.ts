export class Validator {
  notifications

  validate(data: any) {
    const { error, value } = this.rules.validate({ a: 'a string' })
  }
}
