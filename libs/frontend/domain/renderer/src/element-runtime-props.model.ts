import type {
  IElement,
  IElementRuntimeProp,
} from '@codelab/frontend/abstract/core'
import { DATA_ELEMENT_ID, IPropData } from '@codelab/frontend/abstract/core'
import { mergeProps } from '@codelab/shared/utils'
import attempt from 'lodash/attempt'
import isError from 'lodash/isError'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { ExtendedModel, model, modelClass } from 'mobx-keystone'
import { BaseRuntimeProps } from './base-runtime-props.model'

const create = (nodeRef: Ref<IElement>) => new ElementRuntimeProps({ nodeRef })

@model('@codelab/ElementRuntimeProps')
export class ElementRuntimeProps
  extends ExtendedModel(
    modelClass<BaseRuntimeProps<IElement>>(BaseRuntimeProps),
    {},
  )
  implements IElementRuntimeProp
{
  @computed
  get props() {
    return {
      ...this.node.props.current.values,
      /**
       * Internal system props for meta data, use double underline for system-defined identifiers.
       */
      [DATA_ELEMENT_ID]: this.node.id,
      key: this.node.id,
    }
  }

  @computed
  get preProceedProps(): IPropData {
    /**
     * Executes the prop transformation function
     * If successful, merges the result with the original props and returns it
     * If failed, returns the original props
     */

    const transformFn = this.node.transformPropsFn

    if (!transformFn) {
      return this.props
    }

    const result = attempt(transformFn, this.props)

    if (isError(result)) {
      console.warn('Unable to transform props', result)

      return this.props
    }

    return mergeProps(this.props, result)
  }

  static create = create
}
