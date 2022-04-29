import { AnyType, getImportTypeService } from '@codelab/frontend/modules/type'
import { notify } from '@codelab/frontend/shared/utils'
import { IAuth0ID } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import {
  _async,
  _await,
  createContext,
  getSnapshot,
  Model,
  model,
  modelFlow,
  SnapshotOutOf,
  transaction,
} from 'mobx-keystone'
import { atomApi } from './atom.api'
import { Atom } from './atom.model'
import { getAtomService } from './atom.service'

export interface AtomExportPayload {
  atoms: Array<SnapshotOutOf<Atom>>
  types: Array<SnapshotOutOf<AnyType>>
}

@model('@codelab/AtomImportService')
export class ImportAtomService extends Model({}) {
  /**
   * Produces a payload of type {@see AtomExportPayload},
   * where types contain a list of the exported atoms apis + their descendant types
   */
  @modelFlow
  public exportAtoms = _async(function* (
    this: ImportAtomService,
    ids: Array<string>,
  ) {
    const atomService = getAtomService(this)
    const atoms: Array<Atom> = yield* _await(atomService.getAll({ id_IN: ids }))
    const atomSnapshots = this.makeAtomsExportPayload(atoms)
    const typeImportService = getImportTypeService(this)
    const apiIds = atomSnapshots.map((atom) => atom._api.id)

    const typesSnapshots = yield* _await(
      typeImportService.exportTypesPayload(apiIds),
    )

    const payloadData: AtomExportPayload = {
      atoms: atomSnapshots,
      types: typesSnapshots,
    }

    return JSON.stringify(payloadData)
  })

  public makeAtomsExportPayload(atoms: Array<Atom>) {
    return atoms.map((t) => getSnapshot(t))
  }

  @modelFlow
  @transaction
  public importAtoms = _async(function* (
    this: ImportAtomService,
    // should be the result of exportAtoms
    payloadString: string,
    auth0Id: IAuth0ID,
  ) {
    const payload = this.parsePayload(payloadString)

    if (!payload) {
      return
    }

    // Import all types so we can reference them in the atom
    const typeImportService = getImportTypeService(this)
    const importedTypes: Array<SnapshotOutOf<AnyType>> = payload.types

    yield* _await(typeImportService.importTypesPayload(importedTypes, auth0Id))

    const atomService = getAtomService(this)
    // Get all atoms so we can compare them
    yield* _await(atomService.getAll())

    const importedAtoms: Array<SnapshotOutOf<Atom>> = payload.atoms

    for (const importedAtom of importedAtoms) {
      yield* _await(this.upsertAtom(importedAtom))
    }
  })

  @modelFlow
  @transaction
  private upsertAtom = _async(function* (
    this: ImportAtomService,
    atom: SnapshotOutOf<Atom>,
  ) {
    const atomService = getAtomService(this)
    const existing = atomService.atom(atom.id)

    if (existing) {
      yield* _await(this.updateAtom(atom, existing))
    } else {
      yield* _await(this.createAtom(atom))
    }
  })

  @modelFlow
  @transaction
  private createAtom = _async(function* (
    this: ImportAtomService,
    importedAtom: SnapshotOutOf<Atom>,
  ) {
    const atomService = getAtomService(this)

    const tagsConnect = importedAtom.tags?.map((tag) => ({
      where: { node: { id: tag.id } },
    }))

    const input = {
      id: importedAtom.id,
      name: importedAtom.name,
      type: importedAtom.type,
      tags: { connect: tagsConnect },
      api: { connect: { where: { node: { id: importedAtom._api.id } } } },
    }

    const {
      createAtoms: { atoms },
    } = yield* _await(atomApi.CreateAtoms({ input }))

    atomService.updateCache(atoms)
  })

  @modelFlow
  @transaction
  private updateAtom = _async(function* (
    this: ImportAtomService,
    importedAtom: SnapshotOutOf<Atom>,
    existing: Atom,
  ) {
    const atomService = getAtomService(this)

    if (existing.api.id !== importedAtom._api.id) {
      // this shouldn't happen, but if it does the import won't be successful
      throw new Error("Something went wrong, atom api id's don't match")
    }

    yield* _await(
      atomService.update(existing, {
        name: importedAtom.name,
        type: importedAtom.type,
        tags: importedAtom.tags.map((tag) => tag.id),
      }),
    )
  })

  private parsePayload(payloadString: string): Nullable<AtomExportPayload> {
    try {
      return JSON.parse(payloadString)
    } catch (e) {
      console.error('Error while parsing payload: ', e)
      notify(
        {
          type: 'error',
          title: 'Error while parsing payload',
        },
        e,
      )

      return null
    }
  }
}

export const atomImportServiceContext = createContext<ImportAtomService>()

export const getAtomImportServiceContext = (self: object) => {
  const typeService = atomImportServiceContext.get(self)

  if (!typeService) {
    throw new Error('AtomImportService is not defined')
  }

  return typeService
}
