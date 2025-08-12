import type {
  IElementTypeDto,
  IElementTypeKind,
} from '@codelab/shared-abstract-core'

import {
  getBuilderService,
  isRuntimeElement,
} from '@codelab/frontend-abstract-application'
import {
  getElementDomainService,
  type IElementTypeModel,
  type ITypeTransformContext,
  type JsonSchema,
  userRef,
} from '@codelab/frontend-abstract-domain'
import { ExpressionSelectField } from '@codelab/frontend-presentation-components-form'
import { assertIsTypeKind, ITypeKind } from '@codelab/shared-abstract-core'
import { computed } from 'mobx'
import { ExtendedModel, model, modelAction, prop } from 'mobx-keystone'

import { typedPropSchema } from '../shared/typed-prop-schema'
import { createBaseType } from './base-type.model'

const create = ({ elementKind, id, kind, name, owner }: IElementTypeDto) => {
  assertIsTypeKind(kind, ITypeKind.ElementType)

  return new ElementType({
    elementKind,
    id,
    kind,
    name,
    owner: userRef(owner.id),
  })
}

@model('@codelab/ElementType')
export class ElementType
  extends ExtendedModel(createBaseType(ITypeKind.ElementType), {
    elementKind: prop<IElementTypeKind>(),
  })
  implements IElementTypeModel
{
  public static create = create

  @computed
  get builderService() {
    return getBuilderService(this)
  }

  @computed
  get elementDomainService() {
    return getElementDomainService(this)
  }

  get toJson() {
    return {
      __typename: this.__typename,
      elementKind: this.elementKind,
      id: this.id,
      kind: this.kind,
      name: this.name,
      owner: this.owner.current.toJson,
    }
  }

  toJsonSchema(context: ITypeTransformContext): JsonSchema {
    const selectedNode = this.builderService.selectedNode?.current

    return typedPropSchema(
      this,
      {
        component: ExpressionSelectField,
        options:
          selectedNode && isRuntimeElement(selectedNode)
            ? this.elementDomainService.getSelectOptions(
                selectedNode.element.current,
                this.elementKind,
              )
            : [],
      },
      context,
    )
  }

  @modelAction
  writeCache(elementTypeDto: Partial<IElementTypeDto>) {
    super.writeCache(elementTypeDto)

    this.elementKind = elementTypeDto.elementKind ?? this.elementKind

    return this
  }
}
