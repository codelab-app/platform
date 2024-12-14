/* eslint-disable @typescript-eslint/ban-types */
import type { IRef } from '@codelab/shared/abstract/core'
import type { AnyModel } from 'mobx-keystone'

/**
 * Extended by our domain models
 *
 * Can't use IDto since ref types are different
 */
export type IModel<IDto extends IRef, Model extends IRef> = AnyModel & {
  toJson: IDto
  writeCache(data: Partial<IDto>, tracked?: boolean): Model
}
