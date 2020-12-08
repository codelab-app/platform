import { validateSync } from 'class-validator'
import { RequestValidationError } from '../application/common/errors/RequestValidationError'

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

    console.log(valueObject)

    const requestValidationErrors = validateSync(valueObject)

    if (requestValidationErrors.length) {
      const errors = Object.values(requestValidationErrors[0].constraints ?? {})

      throw RequestValidationError.create(errors)
    }

    return valueObject
  }
}
