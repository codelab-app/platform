import Joi from '@hapi/joi'

interface ISpecification<P, T> {
  isSatisfiedBy(input: P): boolean
}

export abstract class Specification<P, T> implements ISpecification<P, T> {
  protected declare abstract rules: Joi.AnySchema

  public isSatisfiedBy(input: P): boolean {
    const { error, value } = this.rules.validate(input)

    if (error) {
      return false
    }

    return true
  }

  public isNotSatisfiedBy(input: P): boolean {
    const { error, value } = this.rules.validate(input)

    if (!error) {
      return false
    }

    return true
  }

  // public isSatisfiedBy(input: P): Result<T> {
  //   const { error, value } = this.rules.validate(input)

  //   if (error) {
  //     return Result.fail<T>(
  //       error.details.reduce((msg, err) => `${msg}\n${err.message}`, ''),
  //     )
  //   }

  //   return Result.ok<T>(value)
  // }
}
