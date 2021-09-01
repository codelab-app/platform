import { BaseAdapter } from '@codelab/backend/abstract/core'
import { DgraphAtom } from '@codelab/backend/infra'
import { AtomType } from '@codelab/shared/enums'
import { Injectable } from '@nestjs/common'
import { Atom } from './atom.model'

@Injectable()
export class AtomAdapter extends BaseAdapter<DgraphAtom, Atom> {
  mapItem({ name, atomType, uid, api }: DgraphAtom) {
    return new Atom({
      id: uid,
      type: atomType as AtomType,
      name,
      api,
    })
  }
}
