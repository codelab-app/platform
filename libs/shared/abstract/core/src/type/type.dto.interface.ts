import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionType, IActionTypeDTO } from './action-type.dto.interface'
import { IAppType, IAppTypeDTO } from './app-type.dto.interface'
import { IArrayType, IArrayTypeDTO } from './array-type.dto.interface'
import {
  ICodeMirrorType,
  ICodeMirrorTypeDTO,
} from './code-mirror-type.dto.interface'
import { IElementType, IElementTypeDTO } from './element-type.dto.interface'
import { IEnumType, IEnumTypeDTO } from './enum-type.dto.interface'
import {
  IInterfaceType,
  IInterfaceTypeDTO,
} from './interface-type.dto.interface'
import { ILambdaType, ILambdaTypeDTO } from './lambda-type.dto.interface'
import { IPageType, IPageTypeDTO } from './page-type.dto.interface'
import {
  IPrimitiveType,
  IPrimitiveTypeDTO,
} from './primitive-type.dto.interface'
import {
  IReactNodeType,
  IReactNodeTypeDTO,
} from './react-node-type.dto.interface'
import {
  IRenderPropType,
  IRenderPropTypeDTO,
} from './render-prop-type.dto.interface'
import { IUnionType, IUnionTypeDTO } from './union-type.dto.interface'

export const ITypeDTO = Type.Union(
  [
    // IActionTypeDTO,
    // IAppTypeDTO,
    // IArrayTypeDTO,
    // ICodeMirrorTypeDTO,
    // IElementTypeDTO,
    // IEnumTypeDTO,
    IInterfaceTypeDTO,
    // ILambdaTypeDTO,
    // IPageTypeDTO,
    IPrimitiveTypeDTO,
    // IReactNodeTypeDTO,
    // IRenderPropTypeDTO,
    // IUnionTypeDTO,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeDTO = Static<typeof ITypeDTO>

export const IType = Type.Union(
  [
    IActionType,
    IAppType,
    IArrayType,
    ICodeMirrorType,
    IElementType,
    IEnumType,
    IInterfaceType,
    ILambdaType,
    IPageType,
    IPrimitiveType,
    IReactNodeType,
    IRenderPropType,
    IUnionType,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type IType = Static<typeof IType>
