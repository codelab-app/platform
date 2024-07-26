/**
 * Re-useable interface that allows some UI to be toggled open and close
 */
export interface IToggleService<TData = void, TOutput = TData> {
  data: TOutput | undefined
  isOpen: boolean

  close(): void
  open(args?: TData): void
}

export type IToggleState<TData = void, TOutput = TData> = Pick<
  IToggleService<TData, TOutput>,
  'data' | 'isOpen'
>
