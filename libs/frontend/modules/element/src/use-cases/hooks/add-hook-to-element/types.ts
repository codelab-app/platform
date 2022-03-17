import { AtomStore } from '@codelab/frontend/modules/atom'
import { InterfaceType, TypeStore } from '@codelab/frontend/modules/type'

export interface InterfaceProps {
  interfaceType: InterfaceType | null
}

export type AddHookToElementMutationInput = {
  typeId: string
}

export type AddHookToElementModalProps = {
  elementId: string
  typeStore: TypeStore
  atomStore: AtomStore
}
