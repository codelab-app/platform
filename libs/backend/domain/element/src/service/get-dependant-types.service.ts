import { Injectable } from '@nestjs/common'
import { type IRef, ITypeKind } from '@codelab/shared/abstract/core'
import type { Neo4jService, OgmService } from '../../../../infra'
import { getElementDependantTypes } from '../../../../cypher'
import {
  arrayTypeSelectionSet,
  baseTypeSelection,
  codeMirrorTypeSelectionSet,
  elementSelectionSet,
  enumTypeSelectionSet,
  fieldSelectionSet,
  interfaceTypeSelectionSet,
  primitiveTypeSelectionSet,
  unionTypeSelectionSet,
} from '../../../../selectionSet'
import { ElementRepository } from '../repository/element.repo.service'
import { FieldRepository } from '../../type/src/repository/field.repo.service'

@Injectable()
export class GetDependantTypesService {
  constructor(
    private neo4jService: Neo4jService,
    private ogmService: OgmService,
    private elementRepository: ElementRepository,
    private fieldRepository: FieldRepository,
  ) {}

  /**
   * This attempts to get all dependent types for an element
   */
  async getDependantTypes(elementRef: IRef) {
  return neo4jService.withReadTransaction(async (txn) => {
    const elements = await ogmService.Element.find({
      selectionSet: `{ ${elementSelectionSet} }`,
      where: { id: elementRef.id },
    })

    const element = elements[0]
    const apiId = element?.renderType.api.id

    const { records } = await txn.run(getElementDependantTypes, {
      id: apiId,
    })

    const allTypes = records.map((rec) => ({
      id: rec.get(0).id,
      typeName: rec.get(0).__typename,
    }))

    // UnionType, ArrayType, EnumType, InterfaceType
    const types = allTypes.filter((type) => type.typeName !== 'Field')

    const typesToFetch = [
      ...types,
      // Types used in fields
      ...(await getFieldTypesToFetch(ogmService, allTypes)),
    ]

    const dependantTypes = await fetchTypes(ogmService, typesToFetch)

    return dependantTypes.flat()
  })
}

private async fetchTypes(
  types: Array<{ id: string; typeName: string }>,
) {
  const promises = []

  promises.push(
    this.ogmService.ArrayType.find({
      selectionSet: `{ ${arrayTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.ArrayType, types) },
    }),
  )

  promises.push(
    ogmService.EnumType.find({
      selectionSet: `{ ${enumTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.EnumType, types) },
    }),
  )

  promises.push(
    ogmService.InterfaceType.find({
      selectionSet: `{ ${interfaceTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.InterfaceType, types) },
    }),
  )

  promises.push(
    ogmService.UnionType.find({
      selectionSet: `{ ${unionTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.UnionType, types) },
    }),
  )

  promises.push(
    ogmService.PrimitiveType.find({
      selectionSet: `{ ${primitiveTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.PrimitiveType, types) },
    }),
  )

  promises.push(
    ogmService.ReactNodeType.find({
      selectionSet: `{ ${baseTypeSelection} }`,
      where: { id_IN: filterByType(ITypeKind.ReactNodeType, types) },
    }),
  )

  promises.push(
    ogmService.RichTextType.find({
      selectionSet: `{ ${baseTypeSelection} }`,
      where: { id_IN: filterByType(ITypeKind.RichTextType, types) },
    }),
  )

  promises.push(
    ogmService.CodeMirrorType.find({
      selectionSet: `{ ${codeMirrorTypeSelectionSet} }`,
      where: { id_IN: filterByType(ITypeKind.CodeMirrorType, types) },
    }),
  )

  promises.push(
    ogmService.RenderPropType.find({
      selectionSet: `{ ${baseTypeSelection} }`,
      where: { id_IN: filterByType(ITypeKind.RenderPropType, types) },
    }),
  )

  promises.push(
    ogmService.ActionType.find({
      selectionSet: `{ ${baseTypeSelection} }`,
      where: { id_IN: filterByType(ITypeKind.ActionType, types) },
    }),
  )

  return await Promise.all(promises)
}

const filterByType = (
  typeName: string,
  allTypes: Array<{ id: string; typeName: string }>,
) =>
  allTypes.filter((type) => type.typeName === typeName).map((type) => type.id)

private async getFieldTypesToFetch(
  allTypes: Array<{ id: string; typeName: string }>,
) {
  const fieldsList = allTypes.filter((type) => type.typeName === 'Field')

  const fields = await this.fieldRepository.find({
    where: { id_IN: fieldsList.map((field) => field.id) },
  })

  // Filtered types are already fetched in App query
  // this is to avoid getting the same type multiple times
  // when used in multiple fields
  return fields
    .filter(
      (field) =>
        ![
          ITypeKind.ActionType,
          ITypeKind.PrimitiveType,
          ITypeKind.ReactNodeType,
          ITypeKind.RenderPropType,
          ITypeKind.RichTextType,
        ].includes(field.fieldType.kind),
    )
    .map((field) => ({
      id: field.fieldType.id,
      typeName: field.fieldType.kind,
    }))
}
