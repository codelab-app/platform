/**
 * Re-useable interface that allows some UI to be toggled open and close
 */
export interface IToggleService<
  TData = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOutput = TData,
> {
  data: TOutput | undefined
  // output: TOutput
  isOpen: boolean

  close(): void
  open(args?: TData): void
}

export type IToggleState<
  IToggleData = undefined,
  TOutput extends Record<string, void> | undefined = undefined,
> = Pick<IToggleService<IToggleData, TOutput>, 'data' | 'isOpen'>
