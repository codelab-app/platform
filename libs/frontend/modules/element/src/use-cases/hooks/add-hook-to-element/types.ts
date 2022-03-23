import { AtomService } from '@codelab/frontend/modules/atom'
import { InterfaceType, TypeService } from '@codelab/frontend/modules/type'

export interface InterfaceProps {
  interfaceType: InterfaceType | null
}

export type AddHookToElementMutationInput = {
  typeId: string
}
