import { DgraphAtom } from '@codelab/backend/infra'
import { InterfaceTypeMapper } from '@codelab/backend/modules/type'
import { Mapper } from '@codelab/shared/utils'
import { Injectable } from '@nestjs/common'
import { Atom } from './atom.model'
import { AtomType } from './atom-type.model'

@Injectable()
export class AtomMapper implements Mapper<DgraphAtom, Atom> {
  constructor(private interfaceTypeMapper: InterfaceTypeMapper) {}

  map({ name, api, atomType, uid }: DgraphAtom): Promise<Atom> | Atom {
    return new Atom({
      id: uid,
      type: atomType as AtomType,
      name,
      api: this.interfaceTypeMapper.map(api),
    })
  }
}
