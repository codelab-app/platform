import { atom } from 'recoil'

export enum ActionType {
  None = 'None',
  Create = 'Create',
  Delete = 'Delete',
  Update = 'Update',
}

export enum EntityType {
  Tag = 'Tag',
  User = 'User',
  None = 'None',
  Page = 'Page',
  Element = 'Element',
  Atom = 'Atom',
  AtomType = 'AtomType',
  App = 'App',
  Style = 'Style',
  Library = 'Library',
  Lambda = 'Lambda',
  Component = 'Component',
  ComponentElement = 'ComponentElement',
  Prop = 'Prop',
  Type = 'Type',
  Field = 'Field',
  Hook = 'Hook',
}

export interface CRUDModalState {
  metadata: any
  deleteIds: Array<string>
  updateId: string
  visibleForm: ActionType
  type: EntityType
  loading: boolean
}

export const defaultState = {
  visibleForm: ActionType.None,
  type: EntityType.None,
  loading: false,
  deleteIds: [],
  updateId: '',
  metadata: undefined,
}

/**
 * The base state for a crud modal. Use useCrudModalState or useMutationCrudForm for a simpler API
 */
export const crudModalAtom = atom<CRUDModalState>({
  key: 'crud_modal',
  default: {
    ...defaultState,
  },
})
