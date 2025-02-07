'use client'

import type {
  IRuntimeComponentModel,
  IRuntimeElementModel,
} from '@codelab/frontend/abstract/application'
import type { IPropData } from '@codelab/shared/abstract/core'

import {
  isRuntimeComponent,
  isRuntimeElement,
  isRuntimePage,
} from '@codelab/frontend/abstract/application'
import {
  type IPageNodeRef,
  isElementRef,
} from '@codelab/frontend/abstract/domain'
import { useNotify, useSuccessNotify } from '@codelab/frontend/infra/context'
import { createValidator } from '@codelab/frontend/shared/utils'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { NotificationType, type Nullable } from '@codelab/shared/abstract/types'
import { evaluateObject } from '@codelab/shared-infra-eval'
import { useState } from 'react'

const useValidateJson = (): ((data: string) => Nullable<IPropData>) => {
  const onError = useNotify(NotificationType.ERROR)

  return (value: string) => {
    try {
      return JSON.parse(value)
    } catch (error) {
      if (error instanceof Error) {
        onError({ description: error.message, title: error.name }, error)
      }

      console.error(error)

      return null
    }
  }
}

/**
 * This requires the full api
 */
const useValidateSchema = (node: IPageNodeRef) => {
  const onError = useNotify(NotificationType.ERROR)

  const interfaceType = isElementRef(node)
    ? node.current.renderType.current.api.current
    : node.current.api.current

  const nodeApiSchema = interfaceType.toJsonSchema({})
  const validator = createValidator(nodeApiSchema)

  return (data: IPropData) => {
    const validation = validator(data)

    if (validation?.details[0]) {
      const { instancePath, message } = validation.details[0]

      onError({
        description: `${instancePath} ${message}`,
        title: `${message}`,
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
  const propService = usePropService()
  const [isLoading, setIsLoading] = useState(false)
  const validateJson = useValidateJson()

  const node = isRuntimeComponent(runtimeNode)
    ? runtimeNode.component
    : runtimeNode.element

  const validator = useValidateSchema(node)
  const nodeLabel = isRuntimeElement(runtimeNode) ? 'Element' : 'Component'
  const onSuccess = useSuccessNotify({ title: `${nodeLabel} props updated.` })

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

    await propService.update({
      data,
      id: node.current.props.id,
    })

    setIsLoading(false)

    onSuccess()
  }

  return { isLoading, lastRenderedProp, nodeLabel, save }
}
