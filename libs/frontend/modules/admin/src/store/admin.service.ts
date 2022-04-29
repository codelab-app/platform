import {
  AtomExportPayload,
  getAtomImportServiceContext,
  getAtomService,
} from '@codelab/frontend/modules/atom'
import { IAdminService } from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  getSnapshot,
  Model,
  model,
  modelFlow,
  transaction,
} from 'mobx-keystone'
import { adminApi } from './admin.api'

@model('@codelab/AdminService')
export class AdminService extends Model({}) implements IAdminService {
  @modelFlow
  @transaction
  resetData = _async(function* (this: AdminService) {
    const { resetDatabase } = yield* _await(adminApi.ResetDatabase())

    return resetDatabase?.success
  })

  @modelFlow
  @transaction
  exportData = _async(function* (this: AdminService) {
    const typeImportService = getImportTypeService(this)
    const typeService = getTypeService(this)
    // Get atoms
    const atomService = getAtomService(this)

    // Get all types to hydrate the types first, so atom reference returns the full data
    const types = yield* _await(
      typeService.getAll({
        // id_IN: atoms.map((atom) => atom.api.id),
      }),
    )

    const atoms = yield* _await(atomService.getAll())

    // const atomImportService = getAtomImportServiceContext(this)
    // const allAtoms = yield* _await(atomService.getAll())
    // const atomSnapshots = atomImportService.makeAtomsExportPayload(allAtoms)
    // const allTypes = yield* _await(typeService.getAll())
    // const typesSnapshots = typeImportService.makeTypesExportPayload(allTypes)

    const payloadData: AtomExportPayload = {
      atoms: atoms.map((atom) => ({
        ...getSnapshot(atom),
        api: getSnapshot(atom.api),
      })),
      types: types.map((type) => getSnapshot(type)),
    }

    return JSON.stringify(payloadData)
  })

  @modelFlow
  @transaction
  importData = _async(function* (
    this: AdminService,
    // should be the result of exportData or AtomImportService.exportAtoms
    payloadString: string,
    currentUserAuth0Id: string,
  ) {
    const atomImportService = getAtomImportServiceContext(this)

    return yield* _await(
      atomImportService.importAtoms(payloadString, currentUserAuth0Id),
    )
  })
}
