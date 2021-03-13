interface IRjsfProperty {
  type: string
  title: string
  default?: any
  minLength?: number
  // [key: string]: any
}

export const RjsfProperty = (props: IRjsfProperty) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
