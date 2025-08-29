import type { IRenderPropTypeDto } from '@codelab/shared-abstract-core'

import {
  getComponentDomainService,
  type IRenderPropTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { ExpressionSelectField } from '@codelab/frontend-presentation-components-form'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { ExtendedModel, model } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'
import { COMPONENT_TEMPLATE } from './react-node-type.model'

const create = ({ id, kind, name, owner }: IRenderPropTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.RenderPropType)

  return new RenderPropType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/RenderPropType')
export class RenderPropType
  extends ExtendedModel(createBaseType(ITypeKind.RenderPropType), {})
  implements IRenderPropTypeModel
{
  public static create = create

  @computed
  get componentDomainService() {
    return getComponentDomainService(this)
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    return typedPropSchema(
      this,
      {
        component: ExpressionSelectField,
        options: this.componentDomainService.getSelectOptions(
          context.component,
        ),
        defaultExpression: COMPONENT_TEMPLATE,
      },
      context,
    )
  }
}
