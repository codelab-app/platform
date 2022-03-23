import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { AtomType } from '@codelab/shared/abstract/core'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { AtomFragment } from '../graphql/Atom.fragment.v2.1.graphql.gen'

@model('codelab/Atom')
export class Atom extends Model({
  id: idProp,
  type: prop<AtomType>(),
  name: prop<string>(),
  tagIds: prop<Array<string>>(() => []),
  // TODO add tags to atom after refactoring tag module to mobx. 1. in props, 2. in Atom.update() 3. in AtomStore.createAtom()
  // tags: prop<Tag[]>(),
  api: prop<Ref<InterfaceType>>(),
}) {
  @modelAction
  updateFromFragment(
    atom: Omit<AtomFragment, 'api' | '__typename'> & { api: { id: string } },
  ) {
    this.name = atom.name
    this.type = atom.type
    this.api = typeRef(atom.api.id) as Ref<InterfaceType>
    this.tagIds = atom.tags.map((tag) => tag.id)
  }

  static fromFragment(
    atom: Omit<AtomFragment, 'api' | '__typename'> & { api: { id: string } },
  ) {
    return new Atom({
      id: atom.id,
      name: atom.name,
      type: atom.type,
      api: typeRef(atom.api.id) as Ref<InterfaceType>,
      tagIds: atom.tags.map((tag) => tag.id),
    })
  }
}

export const atomRef = rootRef<Atom>('AtomRef', {
  onResolvedValueChange(ref, newAtom, oldAtom) {
    if (oldAtom && !newAtom) {
      detach(ref)
    }
  },
})
