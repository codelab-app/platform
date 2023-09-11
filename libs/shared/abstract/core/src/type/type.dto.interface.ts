import type { Static } from '@sinclair/typebox'
import { Type } from '@sinclair/typebox'
import { IActionTypeDTO } from './action-type.dto.interface'
import { IAppTypeDTO } from './app-type.dto.interface'
import { IArrayTypeDTO } from './array-type.dto.interface'
import { ICodeMirrorTypeDTO } from './code-mirror-type.dto.interface'
import { IElementTypeDTO } from './element-type.dto.interface'
import { IEnumTypeDTO } from './enum-type.dto.interface'
import { IInterfaceTypeDTO } from './interface-type.dto.interface'
import { ILambdaTypeDTO } from './lambda-type.dto.interface'
import { IPageTypeDTO } from './page-type.dto.interface'
import { IPrimitiveTypeDTO } from './primitive-type.dto.interface'
import { IReactNodeTypeDTO } from './react-node-type.dto.interface'
import { IRenderPropTypeDTO } from './render-prop-type.dto.interface'
import { IUnionTypeDTO } from './union-type.dto.interface'

export const ITypeDTO = Type.Union(
  [
    IActionTypeDTO,
    IAppTypeDTO,
    IArrayTypeDTO,
    ICodeMirrorTypeDTO,
    IElementTypeDTO,
    IEnumTypeDTO,
    IInterfaceTypeDTO,
    ILambdaTypeDTO,
    IPageTypeDTO,
    IPrimitiveTypeDTO,
    IReactNodeTypeDTO,
    IRenderPropTypeDTO,
    IUnionTypeDTO,
  ],
  { discriminantKey: '__typename', errorMessage: 'Unknown type' },
)

export type ITypeDTO = Static<typeof ITypeDTO>
