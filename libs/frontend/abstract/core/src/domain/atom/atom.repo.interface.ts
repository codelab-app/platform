import type { AtomWhere } from '@codelab/shared/abstract/codegen'
import type { IRepository } from '../../service'
import type { AtomFragment } from './atom.fragment.graphql.gen'
import type { IAtom } from './atom.model.interface'

export type IAtomRepository = IRepository<IAtom, AtomFragment, AtomWhere>
