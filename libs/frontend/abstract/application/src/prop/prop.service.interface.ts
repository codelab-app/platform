import type { IPropModel } from '@codelab/frontend/abstract/domain'
import type {
  IUpdatePropData,
  IUpdatePropDataWithDefaultValues,
} from '@codelab/shared/abstract/core'

export interface IPropService {
  create(props: IPropModel): Promise<IPropModel>
  delete(props: Array<IPropModel>): Promise<void>
  reset(props: IPropModel): void
  update(props: IPropModel, data: IUpdatePropData): Promise<IPropModel>
  updateWithDefaultValuesApplied(
    props: IPropModel,
    data: IUpdatePropDataWithDefaultValues,
  ): Promise<IPropModel>
}
