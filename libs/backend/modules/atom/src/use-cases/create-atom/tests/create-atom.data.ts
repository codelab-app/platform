import { AtomType } from '@codelab/shared/enums'
import { CreateAtomInput } from '../create-atom.input'

export const createAtomInput: CreateAtomInput = {
  name: 'Button (Ant Design)',
  type: AtomType.AntDesignButton,
}

export const createAtomBInput: CreateAtomInput = {
  name: 'Form (Ant Design)',
  type: AtomType.AntDesignForm,
}
