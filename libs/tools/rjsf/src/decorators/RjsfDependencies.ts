interface IRjsfDependencies {
  key: string
  value?: any
  clazz?: Function
}

export const RjsfDependencies = (props: IRjsfDependencies) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
