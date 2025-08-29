import type { IReactNodeTypeDto } from '@codelab/shared-abstract-core'

import {
  getComponentDomainService,
  type IReactNodeTypeModel,
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

const create = ({
  id,
  kind,
  name,
  owner,
}: IReactNodeTypeDto): ReactNodeType => {
  assertIsTypeKind(kind, ITypeKind.ReactNodeType)

  return new ReactNodeType({
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

export const COMPONENT_TEMPLATE = `{{
  function render() {
    const { AntDesignTypographyText } = this.atoms

    return (
      <AntDesignTypographyText>Content</AntDesignTypographyText>
    )
  }.bind(this)
}}`

@model('@codelab/ReactNodeType')
export class ReactNodeType
  extends ExtendedModel(createBaseType(ITypeKind.ReactNodeType), {})
  implements IReactNodeTypeModel
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
