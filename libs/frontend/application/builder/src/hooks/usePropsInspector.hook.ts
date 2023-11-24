import {
  type IPageNodeRef,
  isElement,
  isElementRef,
} from '@codelab/frontend/abstract/domain'
import { evaluateObject } from '@codelab/frontend/application/shared/core'
import { useStore } from '@codelab/frontend/application/shared/store'
import { schemaTransformer } from '@codelab/frontend/application/type'
import { createValidator } from '@codelab/frontend/presentation/view'
import { notify } from '@codelab/frontend/shared/utils'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useState } from 'react'

const validateJson = (value: string): Nullable<IPropData> => {
  try {
    return JSON.parse(value)
  } catch (error) {
    if (error instanceof Error) {
      notify({ description: error.message, title: error.name, type: 'error' })
    }

    console.log(error)

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
export const usePropsInspector = (node: IPageNodeRef) => {
  const { propService, rendererService } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const validator = validateSchema(node)
  const nodeLabel = isElementRef(node) ? 'Element' : 'Component'

  const runtimeModel = isElement(node.current)
    ? rendererService.runtimeElement(node.current)
    : rendererService.runtimeContainerNode(node.current)

  const evaluationContext = runtimeModel!.runtimeProps!.propsEvaluationContext
  const lastRenderedProp = runtimeModel!.runtimeProps!.evaluatedProps

  const save = async (data: string) => {
    const jsonValue = validateJson(data)

    if (!jsonValue) {
      return
    }

    const evaluated = evaluateObject(jsonValue, evaluationContext)

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
