import { validateSync } from 'class-validator'
import { RequestValidationError } from '../application/common/errors/RequestValidationError'

type Constructor<P extends ValueObjectProps> = new (props: P) => any

type FunctionReturnType<
  FunctionType extends (args: any) => any
> = FunctionType extends (...args: any) => infer ReturnType ? ReturnType : any

export interface ValueObjectProps {
  // value: any
  [index: string]: any
}
export abstract class ValueObject<P extends ValueObjectProps> {
  protected props: P

  protected value: any

  constructor(props: P) {
    this.props = { ...props }

    this.value = props.value
  }

  public toString() {
    return this.value
  }

  public static create<T = never, Props extends ValueObjectProps = {}>(
    Cls: any,
    value: any,
    props?: Props,
  ): T {
    const valueObject = new Cls({ ...props, value } as Props)

    const requestValidationErrors = validateSync(valueObject)

    if (requestValidationErrors.length) {
      throw new RequestValidationError(requestValidationErrors.toString())
    }

    return valueObject

    // if (validationErrors.length) {
    //   const errors = Object.values(validationErrors[0].constraints ?? {})
    //   return Result.fail<T>(errors)
    // }

    // return Result.ok<T>(valueObject)
  }
}
