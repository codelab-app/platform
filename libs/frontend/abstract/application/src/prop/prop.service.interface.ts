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
  /**
   * Since used in auto-save form, we must not revalidate cache anywhere in the call tree, otherwise form may re-render
   */
  reset(props: IPropDto): Promise<IRef>
  updateWithDefaultValuesApplied(
    props: IPropModel,
    data: IUpdatePropDataWithDefaultValues,
  ): Promise<IRef>
}
