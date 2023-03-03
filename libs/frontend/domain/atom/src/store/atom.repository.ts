import type { IAtom } from '@codelab/frontend/abstract/core'
import { _async, _await, Model, model, modelFlow } from 'mobx-keystone'
import { atomApi } from './atom.api'

@model('@codelab/AtomRepository')
export class AtomRepository extends Model({}) {
  @modelFlow
  add = _async(function* (this: AtomRepository, atom: IAtom) {
    const {
      createAtoms: { atoms },
    } = yield* _await(atomApi.CreateAtoms({ input: [atom.toCreateInput()] }))
  })
}
