interface IRjsfEnum {
  enum: Array<any>
  enumNames?: Array<string>
  noChoiceValue?: any
}

export const RjsfEnum = (props: IRjsfEnum) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
