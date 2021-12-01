import { InterfaceFormProps } from '@codelab/frontend/modules/type'

export type AddHookToElementFormProps = InterfaceFormProps<any> & {
  interfaceLoading: boolean
}

export type AddHookToElementMutationInput = {
  typeId: string
}

export type AddHookToElementModalProps = {
  elementId: string
}
