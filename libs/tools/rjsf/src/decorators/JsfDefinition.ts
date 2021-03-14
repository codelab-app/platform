export interface IRjsfDefinition {
  // [name: string]: JSONSchema7
  // Overrides class name
  name: string
}

export const JsfDefinition = (props: IRjsfDefinition) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
