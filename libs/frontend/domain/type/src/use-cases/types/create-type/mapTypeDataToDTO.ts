import type {
  IArrayTypeDTO,
  ICreateTypeData,
  IInterfaceTypeDTO,
  ITypeDTO,
  IUnionTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'

export const mapTypeDataToDTO = (data: ICreateTypeData): ITypeDTO => {
  switch (data.kind) {
    // case ITypeKind.AppType:
    // case ITypeKind.ActionType:
    // case ITypeKind.ElementType:
    // case ITypeKind.LambdaType:
    // case ITypeKind.CodeMirrorType:
    // case ITypeKind.PageType:
    // case ITypeKind.PrimitiveType:
    // case ITypeKind.ReactNodeType:
    // case ITypeKind.RenderPropsType:
    // case ITypeKind.EnumType:
    //   return data as ITypeDTO

    case ITypeKind.InterfaceType:
      return {
        ...data,
        __typename: data.kind,
        fields: [],
        owner: {
          auth0Id: data.owner.auth0Id,
          // TODO: This assumption might be wrong, check it out!
          id: data.owner.auth0Id,
        },
      } as IInterfaceTypeDTO

    case ITypeKind.ArrayType:
      return {
        ...data,
        __typename: data.kind,
        itemType: {
          id: data.arrayTypeId as string,
          name: '',
        },
      } as IArrayTypeDTO

    case ITypeKind.UnionType:
      return {
        ...data,
        __typename: data.kind,
        typesOfUnionType: data.unionTypeIds?.map((id) => ({
          id,
          name: '',
        })),
      } as IUnionTypeDTO

    default:
      return { ...data, __typename: data.kind } as ITypeDTO
  }
}
