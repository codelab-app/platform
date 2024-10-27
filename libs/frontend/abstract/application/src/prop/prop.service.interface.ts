import type { IPropModel } from '@codelab/frontend/abstract/domain'
import type {
  IPropCreateData,
  IPropDto,
  IPropUpdateData,
  IRef,
  IUpdatePropDataWithDefaultValues,
} from '@codelab/shared/abstract/core'

import type { ICrudService } from '../services'

export interface IPropService
  extends ICrudService<IRef, IPropCreateData, IPropUpdateData> {
  reset(props: IPropDto): void
  updateWithDefaultValuesApplied(
    props: IPropModel,
    data: IUpdatePropDataWithDefaultValues,
  ): Promise<IRef>
}
