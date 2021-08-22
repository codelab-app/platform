import { AtomType, CreateAtomInput } from '@codelab/shared/codegen/graphql'

export const createAtomInput: CreateAtomInput = {
  name: 'Button (Ant Design)',
  label: 'Button',
  type: AtomType.AntDesignButton,
}

export const createAtomBInput: CreateAtomInput = {
  name: 'Form (Ant Design)',
  label: 'Form',
  type: AtomType.AntDesignForm,
}
