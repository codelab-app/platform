import type { IToggleService } from './toggle.service.interface'

export type IFormService<TData = undefined, TOutput = TData> = IToggleService<
  TData,
  TOutput
>
