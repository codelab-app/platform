import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphAtom } from '@codelab/backend/infra'
import { InterfaceTypeAdapter } from '@codelab/backend/modules/type'
import { Injectable } from '@nestjs/common'
import { Atom } from './atom.model'
import { AtomType } from './atom-type.model'

@Injectable()
export class AtomAdapter extends BaseAdapter<DgraphAtom, Atom> {
  constructor(private interfaceTypeAdapter: InterfaceTypeAdapter) {
    super()
  }

  mapSingle({ name, api, atomType, uid }: DgraphAtom) {
    return new Atom({
      id: uid,
      type: atomType as AtomType,
      name,
      api: this.interfaceTypeAdapter.map(api),
    })
  }
}
