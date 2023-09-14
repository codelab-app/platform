import { isElementRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'

export const useStyle = () => {
  const { builderService } = useStore()

  const getCurrentStyle = ({
    defaultValue,
    key,
  }: {
    key: string
    defaultValue: number | string
  }) => {
    const { selectedNode } = builderService

    if (!isElementRef(selectedNode)) {
      return defaultValue
    }

    const { guiCss } = selectedNode.current

    if (guiCss) {
      return JSON.parse(guiCss)[key] ?? defaultValue
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
