import { type IRef, ITypeKind } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { ElementRepository } from '@codelab/backend/domain/element'
import { FieldRepository } from '@codelab/backend/domain/type'
import { ArrayTypeRepository } from '@codelab/backend/domain/type'
import { EnumTypeRepository } from '@codelab/backend/domain/type'
import { InterfaceTypeRepository } from '@codelab/backend/domain/type'
import { UnionTypeRepository } from '@codelab/backend/domain/type'
import { PrimitiveTypeRepository } from '@codelab/backend/domain/type'
import { ReactNodeTypeRepository } from '@codelab/backend/domain/type'
import { RichTextTypeRepository } from '@codelab/backend/domain/type'
import { CodeMirrorTypeRepository } from '@codelab/backend/domain/type'
import { RenderPropTypeRepository } from '@codelab/backend/domain/type'
import { ActionTypeRepository } from '@codelab/backend/domain/type'
import { Neo4jService } from '../../infra'
import { getElementDependantTypes } from '../../cypher'

@Injectable()
export class DependantTypesService {
  constructor(
    private neo4jService: Neo4jService,
    private elementRepository: ElementRepository,
    private fieldRepository: FieldRepository,
    private arrayTypeRepository: ArrayTypeRepository,
    private enumTypeRepository: EnumTypeRepository,
    private interfaceTypeRepository: InterfaceTypeRepository,
    private unionTypeRepository: UnionTypeRepository,
    private primitiveTypeRepository: PrimitiveTypeRepository,
    private reactNodeTypeRepository: ReactNodeTypeRepository,
    private richTextTypeRepository: RichTextTypeRepository,
    private codeMirrorTypeRepository: CodeMirrorTypeRepository,
    private renderPropTypeRepository: RenderPropTypeRepository,
    private actionTypeRepository: ActionTypeRepository,
  ) {}

  async getDependantTypes(elementRef: IRef) {
    return this.neo4jService.withReadTransaction(async (txn) => {
      const element = await this.elementRepository.findOne({ where: { id: elementRef.id } })
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
        ...(await this.getFieldTypesToFetch(allTypes)),
      ]

      const dependantTypes = await this.fetchTypes(typesToFetch)

      return dependantTypes.flat()
    })
  }

  private async fetchTypes(types: Array<{ id: string; typeName: string }>) {
    const promises = []

    promises.push(
      this.arrayTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.ArrayType, types) },
      }),
    )

    promises.push(
      this.enumTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.EnumType, types) },
      }),
    )

    promises.push(
      this.interfaceTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.InterfaceType, types) },
      }),
    )

    promises.push(
      this.unionTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.UnionType, types) },
      }),
    )

    promises.push(
      this.primitiveTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.PrimitiveType, types) },
      }),
    )

    promises.push(
      this.reactNodeTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.ReactNodeType, types) },
      }),
    )

    promises.push(
      this.richTextTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.RichTextType, types) },
      }),
    )

    promises.push(
      this.codeMirrorTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.CodeMirrorType, types) },
      }),
    )

    promises.push(
      this.renderPropTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.RenderPropType, types) },
      }),
    )

    promises.push(
      this.actionTypeRepository.find({
        where: { id_IN: this.filterByType(ITypeKind.ActionType, types) },
      }),
    )

    return Promise.all(promises)
  }

  private filterByType(
    typeName: string,
    allTypes: Array<{ id: string; typeName: string }>,
  ) {
    return allTypes
      .filter((type) => type.typeName === typeName)
      .map((type) => type.id)
  }

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
}
