import { validateSync } from 'class-validator'
import { RequestValidationError } from '../application/common/errors/RequestValidationError'

export interface ValueObjectProps {
  [index: string]: any
}

export class ValueObject<P extends ValueObjectProps> {
  protected props: P

  protected value: any

  constructor(props: P) {
    this.props = { ...props }

    this.value = props?.value
  }

  public toString() {
    return this?.value
  }

  public static create<T = never, Props extends ValueObjectProps = {}>(
    Cls: any,
    value: string | number,
    props?: Props,
  ): T {
    const valueObject = new Cls({ ...props, value } as ValueObjectProps)

    const requestValidationErrors = validateSync(valueObject)

    if (requestValidationErrors.length) {
      const errors = Object.values(requestValidationErrors[0].constraints ?? {})

      RequestValidationError.throw(errors)
    }

    return valueObject
  }
}
