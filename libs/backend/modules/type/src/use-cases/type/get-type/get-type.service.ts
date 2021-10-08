import { DgraphUseCase } from '@codelab/backend/application'
import { IType, TypeKind, TypeSchema } from '@codelab/shared/abstract/core'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { GetTypeRequest } from './get-type.request'

@Injectable()
export class GetTypeService extends DgraphUseCase<
  GetTypeRequest,
  IType | null
> {
  protected schema = TypeSchema.optional().nullable()

  protected async executeTransaction(request: GetTypeRequest, txn: Txn) {
    const type = await this.dgraph.getOneNamed<any>(
      txn,
      GetTypeService.createQuery(request),
      'query',
    )

    if (type?.typeKind === TypeKind.UnionType) {
      return {
        ...type,
        typeIdsOfUnionType: type.typesOfUnionType.map(({ id }: any) => id),
      }
    }

    return type
  }

  private static createQuery({
    input: {
      where: { id, name, atomId },
    },
  }: GetTypeRequest) {
    if ([id, name, atomId].filter((x) => x).length > 1) {
      throw new Error('Only 1 parameter is allowed')
    }

    if (atomId) {
      return GetTypeService.getTypeByAtomQuery(atomId)
    }

    if (id) {
      return GetTypeService.getTypeByIdQuery(id)
    }

    if (name) {
      return GetTypeService.getTypeByName(name)
    }

    throw new Error('Missing where parameters')
  }

  public static getTypeByAtomQuery(atomId: string, queryName = 'query') {
    return `{
        var(func: type(Atom)) @filter(uid(${atomId})) {
          api {
            ApiUid as uid
          }
        }
        ${queryName}(func: uid(ApiUid))  @recurse(depth: 2) {
          id: uid
          expand(Type, Field)
          value: stringValue
        }
      }`
  }

  public static getTypeByIdQuery(typeId: string, queryName = 'query') {
    return `{
        ${queryName}(func: type(Type)) @filter(uid(${typeId})) @recurse(depth: 2) {
          id: uid
          expand(Type, Field)
          value: stringValue
        }
      }`
  }

  public static getTypeByName(typeName: string, queryName = 'query') {
    return `{
        ${queryName}(func: type(Type)) @filter(eq(name, "${typeName}")) @recurse(depth: 2) {
          id: uid
          expand(Type, Field)
          value: stringValue
        }
      }`
  }
}
