/* eslint-disable @typescript-eslint/ban-types */
import type { IRef } from '@codelab/shared/abstract/core'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { AnyModel, Ref } from 'mobx-keystone'
import type { OmitByValue, PickByValue } from 'utility-types'

/**
 * Extended by our domain models
 *
 * Can't use IDto since ref types are different
 */
export type IModel<IDto extends IRef, Model extends IRef> = AnyModel & {
  toJson: IDto
  writeCache(data: Partial<IDto>, tracked?: boolean): Model
}
