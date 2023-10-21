import type {
  IPropModel,
  IUpdatePropData,
  IUpdatePropDataWithDefaultValues,
} from '@codelab/frontend/abstract/domain'
import type { IPropRepository } from './prop.repo.interface'

export interface IPropService {
  propRepository: IPropRepository

  create(props: IPropModel): Promise<IPropModel>
  delete(props: Array<IPropModel>): Promise<void>
  reset(props: IPropModel): void
  update(props: IPropModel, data: IUpdatePropData): Promise<IPropModel>
  updateWithDefaultValuesApplied(
    props: IPropModel,
    data: IUpdatePropDataWithDefaultValues,
  ): Promise<IPropModel>
}
