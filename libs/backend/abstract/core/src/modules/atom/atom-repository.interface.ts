import { AtomType, IAtom, IUser } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { CreateResponsePort } from '../../primary'
import { IBaseRepository, ITransaction } from '../../secondary'

export interface IAtomRepository extends IBaseRepository<IAtom> {
  // I'm not sure if we need this, UpsertAtomsService uses it. Maybe for seeding,
  // but it should most get replaced with smh else after the neo4j integration
  upsertAtoms(
    atoms: Array<IAtom>,
    currentUser: IUser,
    transaction: ITransaction,
  ): Promise<Array<CreateResponsePort>>

  getAtomByType(
    atomType: AtomType,
    transaction: ITransaction,
  ): Promise<Maybe<IAtom>>

  getAtomByElement(
    elementId: string,
    transaction: ITransaction,
  ): Promise<Maybe<IAtom>>

  getAtomsByTypes(
    atomTypes: Array<AtomType>,
    transaction: ITransaction,
  ): Promise<Array<IAtom>>

  searchAtomsByName(
    name: string,
    transaction: ITransaction,
  ): Promise<Array<IAtom>>
}
