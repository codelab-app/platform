import {
  DgraphEntityType,
  IQueryFactory,
  makeFilterString,
} from '@codelab/backend/infra'
import { TypeKind } from '@codelab/shared/abstract/core'
import {
  enumTypeValueFragment,
  fieldFragment,
  typeFragment,
} from './type.fragments'

export class TypeQueryFactory implements IQueryFactory {
  /** Queries the api Interface of an Atom. Response is of type {@link IInterfaceType } */
  public forApiOfAtom(atomId: string, queryName = 'query') {
    return `{
        var(func: type(${DgraphEntityType.Atom})) @filter(uid(${atomId})) {
          api {
            ApiUid as uid
          }
        }

        ${queryName}(func: uid(ApiUid)) {
          ${typeFragment}
        }
      }`
  }

  /** Response is of type {@link IType } */
  public forGet(filter?: string, queryName = 'getType') {
    const filterString = makeFilterString(filter)

    return `{
      ${queryName}(func: type(${DgraphEntityType.Type})) ${filterString} {
          ${typeFragment}
      }
    }`
  }

  /** Queries the Enum type in which the enum type value is contained. Response is of type {@link IEnumType } */
  public forGetByEnumTypeValue(enumTypeValueId: string, queryName = 'query') {
    return `{
        var(func: type(${DgraphEntityType.EnumTypeValue})) @filter(uid(${enumTypeValueId})) {
          ~allowedValues {
            EnumTypeUid as uid
          }
        }

        ${queryName}(func: uid(EnumTypeUid)) {
          ${typeFragment}
        }
      }`
  }

  /** Response is of type {@link IEnumTypeValue } */
  public forEnumTypeValue(filter: string, queryName = 'query') {
    const filterString = makeFilterString(filter)

    return `{
        ${queryName}(func: type(${DgraphEntityType.EnumTypeValue})) ${filterString} {
           ${enumTypeValueFragment}
        }
      }`
  }

  /** Response is of type {@link TypeReferencesResponse} */
  public forTypeReferences(typeId: string, queryName = 'query') {
    return `{
      ${queryName}(func: type(${DgraphEntityType.Type})) @filter(uid(${typeId})) {
          atoms: ~api @filter(type(Atom)) {
						id: uid
            name
          }
          fields: ~type @filter(type(Field)) {
						id: uid
            name
          }
        }
    }`
  }

  /** Response is of type {@link ITypeGraph}. Use executeQuery  */
  forGetGraph(filter: string, extraQuery?: string) {
    const filterString = makeFilterString(filter)

    return `{
      ${extraQuery || ''}

      var(func: type(${
        DgraphEntityType.Type
      })) ${filterString} @recurse @normalize {
        UIDS as uid
        expand(_all_)
      }

      vertices(func: uid(UIDS)) @filter(type(Type)) {
       ${typeFragment}
      }

    edges(func: uid(UIDS))
      @normalize
      @filter(
          type(Type) AND
          (
            (eq(typeKind, "${
              TypeKind.InterfaceType
            }") AND gt(count(fields), 0) )OR
            (eq(typeKind, "${TypeKind.ArrayType}") AND has(itemType)) OR
            (eq(typeKind, "${
              TypeKind.UnionType
            }") AND gt(count(typesOfUnionType), 0))
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

  /** Response is of type {@link IField}. Use executeQuery  */
  forGetField(filter: string, queryName?: string) {
    const filterString = makeFilterString(filter)

    return `{
       ${queryName}(func: type(${DgraphEntityType.Field})) ${filterString} @normalize {
          ${fieldFragment}
        }
    }`
  }
}
