import { IUnionTypeModel } from '@codelab/frontend-abstract-domain'
import type { FilterDOMProps } from 'uniforms'

declare module 'uniforms' {
  interface FilterDOMProps {
    nullable: boolean
    isTypedProp: boolean
    forbiddenValues: Array<string>
    decimal: boolean
    defaultExpression: string
    unionType: IUnionTypeModel
    oneOf: Array<ObjectLike>
  }
}
