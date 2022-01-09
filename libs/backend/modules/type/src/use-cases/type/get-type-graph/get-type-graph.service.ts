import { DgraphUseCase } from '@codelab/backend/application'
import { ITypeGraph, TypeGraphSchema } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { Injectable } from '@nestjs/common'
import { Txn } from 'dgraph-js-http'
import { mapType } from '../get-types'
import { GetTypeGraphRequest } from './get-type-graph.request'

@Injectable()
export class GetTypeGraphService extends DgraphUseCase<
  GetTypeGraphRequest,
  Nullable<ITypeGraph>
> {
  protected schema = TypeGraphSchema.nullable()

  protected async executeTransaction(
    request: GetTypeGraphRequest,
    txn: Txn,
  ): Promise<Nullable<ITypeGraph>> {
    const response = await txn.query(GetTypeGraphService.createQuery(request))
    const data = response.data as any

    return {
      edges: data.edges ?? [],
      vertices: (data.vertices ?? []).map((t: any) => {
        return mapType(t)
      }),
    }
  }

  private static createQuery({
    input: {
      where: { id, name, atomId },
    },
  }: GetTypeGraphRequest) {
    if ([id, name, atomId].filter((x) => x).length > 1) {
      throw new Error('Only 1 parameter is allowed')
    }

    if (atomId) {
      return GetTypeGraphService.getByAtomQuery(atomId)
    }

    if (id) {
      return GetTypeGraphService.getByIdQuery(id)
    }

    if (name) {
      return GetTypeGraphService.getByNameQuery(name)
    }

    throw new Error('Missing where parameters')
  }

  public static getByIdQuery(typeId: string) {
    return GetTypeGraphService.getTypeGraphQuery(`@filter(uid( ${typeId}))`)
  }

  public static getByNameQuery(typeName: string) {
    return GetTypeGraphService.getTypeGraphQuery(
      `@filter(eq(name, "${typeName}"))`,
    )
  }

  public static getByAtomQuery(atomId: string) {
    return GetTypeGraphService.getTypeGraphQuery(
      `@filter(uid(API_ID))`,
      `
        var(func: type(Atom)) @filter(uid(${atomId})) {
          api {
              API_ID as uid
          }
        }`,
    )
  }

  public static getTypeGraphQuery(filter?: string, extraQuery = '') {
    return `{
      ${extraQuery}

      var(func: type(Type)) ${filter} @recurse @normalize {
        UIDS as uid
        expand(_all_)
      }

      vertices(func: uid(UIDS)) @filter(type(Type)) {
        id: uid
        typeKind
        owner {
          id
        }
        primitiveKind
        itemType {
          uid
        }
        elementKind
        language
        fields {
          id: uid
          expand(Field)
        }
        typesOfUnionType {
          id: uid
        }
        name
        allowedValues (orderasc: order) {
          id: uid
          name
          value: stringValue
        }
      }

    edges(func: uid(UIDS))
      @normalize
      @filter(
          type(Type) AND
          (
            (eq(typeKind, "InterfaceType") AND gt(count(fields), 0) )OR
            (eq(typeKind, "ArrayType") AND has(itemType)) OR
            (eq(typeKind, "UnionType") AND gt(count(typesOfUnionType), 0))
          )
      ) {
        source: uid
        fields {
          type {
           target: uid
          }
          id: uid
          key: key
          name: name
          description: description
        }
        itemType {
          target: uid
        }
        typesOfUnionType {
          target: uid
        }
      }
    }`
  }
}
