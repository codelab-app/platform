interface ValueObjectProps {
  value: any
  [index: string]: any
}

/**
 * @desc ValueObjects are objects that we determine their
 * equality through their structrual property.
 */

export abstract class ValueObject<T extends ValueObjectProps> {
  protected props: T

  protected value: any

  protected constructor(props: T) {
    this.props = {
      ...props,
    }
    this.value = props.value
  }

  // public equals(vo?: ValueObject<T>): boolean {
  //   if (vo === null || vo === undefined) {
  //     return false
  //   }

  //   if (vo.props === undefined) {
  //     return false
  //   }

  //   return JSON.stringify(this.props) === JSON.stringify(vo.props)
  // }
}
