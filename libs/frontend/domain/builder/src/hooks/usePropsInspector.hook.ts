import type { IPageNodeRef, IPropData } from '@codelab/frontend/abstract/core'
import { isElementPageNodeRef } from '@codelab/frontend/abstract/core'
import { schemaTransformer } from '@codelab/frontend/domain/type'
import { useStore } from '@codelab/frontend/presentation/container'
import { createValidator } from '@codelab/frontend/presentation/view'
import { notify } from '@codelab/frontend/shared/utils'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useState } from 'react'

const validateJson = (value: string): Nullable<IPropData> => {
  try {
    return JSON.parse(value)
  } catch (error) {
    if (error instanceof Error) {
      notify({ content: error.message, title: error.name, type: 'error' })
    }

    console.log(error)

    return null
  }
}

const validateSchema = (node: IPageNodeRef) => {
  const interfaceType = isElementPageNodeRef(node)
    ? node.current.renderType?.current.api.current
    : node.current.api.current

  if (!interfaceType) {
    return () => true
  }

  const nodeApiSchema = schemaTransformer.transform(interfaceType)
  const validator = createValidator(nodeApiSchema)

  return (data: IPropData) => {
    const validation = validator(data)

    if (validation.errors?.[0]) {
      const { instancePath, message } = validation.errors[0]

      notify({
        content: `${instancePath} ${message}`,
        title: message,
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
  const { propService } = useStore()
  const [isLoading, setIsLoading] = useState(false)
  const validator = validateSchema(node)
  const nodeLabel = isElementPageNodeRef(node) ? 'Element' : 'Component'

  const save = async (data: string) => {
    const jsonValue = validateJson(data)

    if (!jsonValue) {
      return
    }

    node.current.props.current.setMany(jsonValue)

    const evaluatedProps = isElementPageNodeRef(node)
      ? node.current.runtimeProp?.evaluatedPropsBeforeRender || {}
      : node.current.props.current.values

    if (!validator(evaluatedProps)) {
      return
    }

    setIsLoading(true)
    await propService.update({ data, id: node.current.props.id })
    setIsLoading(false)

    notify({ title: `${nodeLabel} props updated.`, type: 'success' })
  }

  return { isLoading, nodeLabel, save }
}
