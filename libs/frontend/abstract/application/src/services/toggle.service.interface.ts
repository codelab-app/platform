/**
 * Re-useable interface that allows some UI to be toggled open and close
 *
 * Previously needed to use refs since the keystone model could not have 2 parents
 */
export interface IToggleService<TData = undefined, TOutput = TData> {
  data: TOutput | undefined
  isOpen: boolean

  close(): void
  open(args?: TData): void
}

export type IToggleState<
  IToggleData = undefined,
  TOutput extends Record<string, void> | undefined = undefined,
> = Pick<IToggleService<IToggleData, TOutput>, 'data' | 'isOpen'>
