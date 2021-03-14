interface IRjsfArrayObject {
  clazz: Function
  hasFixedItems?: boolean
  isFixedItem?: boolean
}

export const RjsfArrayObject = (clazz: IRjsfArrayObject) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
