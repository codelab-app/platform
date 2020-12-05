interface ValueObjectProps {
  value: any
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
}
