import { isElementRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import type { CssProperty } from './css'
import { DefaultCssProperties } from './css'

export const useStyle = () => {
  const { builderService } = useStore()

  const getCurrentStyle = (property: CssProperty) => {
    const { selectedNode } = builderService
    const defaultValue = DefaultCssProperties[property].defaultValue

    if (!isElementRef(selectedNode)) {
      return defaultValue
    }

    const { guiCss } = selectedNode.current

    if (guiCss) {
      return JSON.parse(guiCss)[property] ?? defaultValue
    }

    return defaultValue
  }

  const setStyle = (key: string, value: string) => {
    const { selectedNode } = builderService

    if (!isElementRef(selectedNode)) {
      return
    }

    selectedNode.current.appendToGuiCss({ [key]: value })
  }

  return {
    getCurrentStyle,
    setStyle,
  }
}
