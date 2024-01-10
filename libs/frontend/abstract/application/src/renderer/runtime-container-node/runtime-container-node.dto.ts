import type {
  IComponentModel,
  IPageModel,
} from '@codelab/frontend/abstract/domain'
import type { Ref } from 'mobx-keystone'

export interface IRuntimeContainerNodeDTO {
  containerNode: Ref<IComponentModel> | Ref<IPageModel>
  id: string
}
