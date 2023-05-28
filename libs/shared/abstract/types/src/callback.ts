// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface PromiseCallback<Return, Param extends Array<any>> {
  (...args: Param): Promise<Return>
}
