'use client'

import type {
  IRuntimeComponentModel,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import {
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
} from '@codelab/frontend/abstract/application'
import {
  type IPageNodeRef,
  isElementRef,
} from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/infra/mobx'
import { notify } from '@codelab/frontend/shared/utils'
import { schemaTransformer } from '@codelab/frontend/presentation/components/interface-form'
import { createValidator } from '@codelab/frontend-presentation-components-form'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { evaluateObject } from '@codelab/shared/utils'
import { useState } from 'react'

const validateJson = (value: string): Nullable<IPropData> => {
  try {
    return JSON.parse(value)
  } catch (error) {
    if (error instanceof Error) {
      notify({ description: error.message, title: error.name, type: 'error' })
    }

    console.error(error)

    return null
  }
}

const validateSchema = (node: IPageNodeRef) => {
  const interfaceType = isElementRef(node)
    ? node.current.renderType.current.api.current
    : node.current.api.current

  const nodeApiSchema = schemaTransformer.transform(interfaceType)
  const validator = createValidator(nodeApiSchema)

  return (data: IPropData) => {
    const validation = validator(data)

    if (validation?.details[0]) {
      const { instancePath, message } = validation.details[0]

      notify({
        description: `${instancePath} ${message}`,
        title: `${message}`,
        type: 'error',
      })

      return
    }

    return true
  }
}

/**
 * If node is IComponent, that means we are viewing it in the component builder only.
 */
export const usePropsInspector = (
  runtimeNode: IRuntimeComponentModel | IRuntimeElementModel,
) => {
  const { propService } = useStore()
  const [isLoading, setIsLoading] = useState(false)

  const node = isRuntimeComponent(runtimeNode)
    ? runtimeNode.component
    : runtimeNode.element

  const validator = validateSchema(node)
  const nodeLabel = isRuntimeElement(runtimeNode) ? 'Element' : 'Component'

  const runtimeProps = !isRuntimePage(runtimeNode)
    ? runtimeNode.runtimeProps
    : undefined

  const runtimeContext = runtimeProps?.runtimeContext
  const lastRenderedProp = runtimeProps?.evaluatedProps || {}

  const save = async (data: string) => {
    const jsonValue = validateJson(data)

    if (!jsonValue || !runtimeContext) {
      return
    }

    const evaluated = evaluateObject(jsonValue, runtimeContext)

    if (!validator(evaluated)) {
      return
    }

    setIsLoading(true)

    await propService.update(node.current.props, {
      data,
      id: node.current.props.id,
    })

    setIsLoading(false)

    notify({
      description: '',
      title: `${nodeLabel} props updated.`,
      type: 'success',
    })
  }

  return { isLoading, lastRenderedProp, nodeLabel, save }
}
