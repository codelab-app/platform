import { notify } from '@codelab/frontend/shared/utils'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import {
  _async,
  _await,
  createContext,
  fromSnapshot,
  getSnapshot,
  Model,
  model,
  modelFlow,
  SnapshotOutOf,
  transaction,
} from 'mobx-keystone'
import { AnyType } from './models'
import { getTypeService } from './type.service'

export type WithTypeImportService = {
  typeImportService: TypeImportService
}

@model('@codelab/TypeImportService')
export class TypeImportService extends Model({}) {
  @modelFlow
  @modelFlow
  public exportTypesPayload = _async(function* (
    this: TypeImportService,
    ids: Array<string>,
  ) {
    const typeService = getTypeService(this)
    const types = yield* _await(typeService.getAllWithDescendants(ids))

    return this.makeTypesExportPayload(types)
  })

  public makeTypesExportPayload(atoms: Array<AnyType>) {
    return atoms.map((t) => getSnapshot(t))
  }

  @modelFlow
  public exportTypes = _async(function* (
    this: TypeImportService,
    ids: Array<string>,
  ) {
    const payload = yield* _await(this.exportTypesPayload(ids))

    return JSON.stringify(payload)
  })

  @modelFlow
  @transaction
  public importTypes = _async(function* (
    this: TypeImportService,
    payloadString: string, // should be an array of IAnyType snapshots
    currentUserAuth0Id: string,
  ) {
    const payload = this.parsePayload(payloadString)

    if (!payload) {
      return
    }

    return yield* _await(this.importTypesPayload(payload, currentUserAuth0Id))
  })

  @modelFlow
  @transaction
  public importTypesPayload = _async(function* (
    this: TypeImportService,
    payload: Array<SnapshotOutOf<AnyType>>,
    currentUserAuth0Id: string,
  ) {
    const typeService = getTypeService(this)

    // get all types at once, so we can compare them locally
    yield* _await(typeService.getAll())

    // keep a queue of types to create, so we can check for types that depend on other types
    const queue: Array<SnapshotOutOf<AnyType>> = payload
    const isInQueue = (id: string) => queue.some((t) => t.id === id)
    let i = 0

    while (queue.length > 0) {
      if (i++ > 10000) {
        throw new Error('Infinite loop detected')
      }

      const type = queue.shift()

      if (!type) {
        continue
      }

      // check if the descendants are imported
      let dependenciesNotImported = false

      for (const dependantId of this.getTypeDependantIds(type)) {
        // If the type this type is depending on is still on the queue (i.e. not imported)
        // push this type to the back of the queue to be processed later
        if (isInQueue(dependantId)) {
          queue.push(type)
          dependenciesNotImported = true
          break
        }
      }

      if (dependenciesNotImported) {
        continue
      }

      yield* _await(this.upsertType(type, currentUserAuth0Id))
    }
  })

  /** Returns the type ids which must be imported before this type is imported */
  private getTypeDependantIds(type: SnapshotOutOf<AnyType>): Array<string> {
    switch (type.kind) {
      case ITypeKind.UnionType:
        return type.typesOfUnionType.map((t) => t.id)
      case ITypeKind.InterfaceType:
        return Object.values(type.fields).map((f) => f.type.id)

      case ITypeKind.ArrayType: {
        const itemId = type.itemType?.id

        return itemId ? [itemId] : []
      }
    }

    return []
  }

  @modelFlow
  @transaction
  private upsertType = _async(function* (
    this: TypeImportService,
    importedType: SnapshotOutOf<AnyType>,
    auth0Id: string,
  ) {
    const typeService = getTypeService(this)
    const existingType = this.getExistingType(importedType)
    const isOwned = existingType?.ownerId === auth0Id

    // Create or update the type
    if (existingType && !isOwned) {
      // Not owned by current user, use as is
      return
    }

    if (existingType && isOwned) {
      console.log('update existing')

      console.log(existingType, importedType)

      // Owned by the current user, update it
      // applySnapshot(existingType, importedType)

      yield* _await(typeService.update(existingType))

      return
    }

    // Not owned by current user, create it with the current user as owner
    // const createdType = fromSnapshot<AnyType>(importedType)
    // createdType.ownerAuth0Id = currentUserAuth0Id
    yield* _await(typeService.create(importedType, auth0Id))
  })

  private getExistingType(
    this: TypeImportService,
    importedType: SnapshotOutOf<AnyType>,
  ) {
    const typeService = getTypeService(this)

    // if it's a primitive - check for the same primitiveKind
    if (importedType.kind === ITypeKind.PrimitiveType) {
      const foundPrimitive = typeService.typesList.find(
        (t) =>
          t.kind === ITypeKind.PrimitiveType &&
          t.primitiveKind === importedType.primitiveKind,
      )

      console.log({ importedType, foundPrimitive })

      if (foundPrimitive) {
        return foundPrimitive
      }
    }

    console.log({ importedType, found: typeService.type(importedType.id) })

    // if not -get by id
    return typeService.type(importedType.id)
  }

  private parsePayload(
    payloadString: string,
  ): Nullable<Array<SnapshotOutOf<AnyType>>> {
    try {
      return JSON.parse(payloadString).map((item: any) => {
        return fromSnapshot<SnapshotOutOf<AnyType>>(item)
      })
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

export const typeImportServiceContext = createContext<TypeImportService>()

export const getTypeImportService = (self: object) => {
  const typeService = typeImportServiceContext.get(self)

  if (!typeService) {
    throw new Error('TypeImportService is not defined')
  }

  return typeService
}
