/**
 * Re-useable interface that allows some UI to be toggled open and close
 */
export interface IToggleService<
  IToggleData = undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TOutput extends Record<string, any> | undefined = undefined,
> {
  data: IToggleData | undefined
  // output: TOutput
  isOpen: boolean

  close(): void
  open(args?: IToggleData): void
}

export type IToggleState<
  IToggleData = undefined,
  TOutput extends Record<string, void> | undefined = undefined,
> = Pick<IToggleService<IToggleData, TOutput>, 'data' | 'isOpen'>
