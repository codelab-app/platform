interface IRjsfMultipleChoice {
  type: 'string' | 'number' | 'integer' | 'boolean'
  choices: Array<any>
}

export const RjsfMultipleChoice = (props: IRjsfMultipleChoice) => (
  target: {} | any,
  name?: PropertyKey,
): any => {
  //
}
