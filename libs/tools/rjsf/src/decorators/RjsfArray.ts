interface IRjsfArray {
  type: 'string' | 'number' | 'integer' | 'boolean'
  defaultValue?: any
  format?: any
  minLength?: number
}

export const RjsfArray = (props: IRjsfArray) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
