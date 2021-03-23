export enum PropType {
  Single = 'Single',
  Leaf = 'Leaf',
  /**
   * ctx is a subset of eval where return object becomes the prop
   */
  Ctx = 'Ctx',
  Eval = 'Eval',
}
