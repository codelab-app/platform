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

    console.log('defaultValue', defaultValue)

    if (!isElementRef(selectedNode)) {
      return defaultValue
    }

    const { guiCss } = selectedNode.current

    if (guiCss) {
      console.log('guiCss', guiCss)

      return JSON.parse(guiCss)[key]
    }

    return defaultValue
  }

  const setStyle = (key: string, value: string) => {
    console.log('setStyle', key, value)

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
