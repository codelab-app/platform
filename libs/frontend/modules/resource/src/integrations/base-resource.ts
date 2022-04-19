import { IResource } from '@codelab/shared/abstract/core'

export abstract class BaseResource<R> {
  constructor(protected _config: IResource['config']) {}

  abstract getInstance(): R
}
