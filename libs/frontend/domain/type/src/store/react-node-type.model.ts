import type { IReactNodeTypeDto } from '@codelab/shared-abstract-core'

import { getRendererService } from '@codelab/frontend-abstract-application'
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

  @computed
  get renderer() {
    const activeRenderer = this.rendererService.activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get rendererService() {
    return getRendererService(this)
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    const currentComponent = this.renderer.runtimeComponent?.component.current

    return typedPropSchema(
      this,
      {
        component: ExpressionSelectField,
        options: this.componentDomainService.getSelectOptions(currentComponent),
        defaultExpression: COMPONENT_TEMPLATE,
      },
      context,
    )
  }
}
