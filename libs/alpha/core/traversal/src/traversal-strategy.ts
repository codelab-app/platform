export interface TraversalStrategy {
  root: any
  acc: any
  iteratee: any

  setRoot(): Function
  setAcc(): Function
  setIteratee(): Function
}
