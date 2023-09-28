import { isElementRef } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { useEffect, useState } from 'react'
import type { CssProperty } from './css'
import { DefaultCssProperties } from './css'

export const useStyle = () => {
  const { builderService } = useStore()

  const [currentStyles, setCurrentStyles] = useState<{
    [key: string]: string
  }>({})

  useEffect(() => {
    if (
      builderService.selectedNode &&
      isElementRef(builderService.selectedNode)
    ) {
      const newStyles = JSON.parse(
        builderService.selectedNode.current.style.guiCss || '{}',
      )

      setCurrentStyles(newStyles)
    }
  }, [builderService.selectedNode])

  const getCurrentStyle = (property: CssProperty) => {
    return (
      currentStyles[property] ?? DefaultCssProperties[property].defaultValue
    )
  }

  // Set a new style value and update memoized styles
  const setStyle = (key: CssProperty, value: string) => {
    const { selectedNode } = builderService

    if (!selectedNode || !isElementRef(selectedNode)) {
      return
    }

    const updatedStyles = { ...currentStyles, [key]: value }

    setCurrentStyles(updatedStyles)

    selectedNode.current.style.appendToGuiCss(updatedStyles)
  }

  const resetStyle = (property: CssProperty) => {
    const { defaultValue } = DefaultCssProperties[property]
    setStyle(property, defaultValue)
  }

  const canReset = (property: CssProperty) => {
    const { defaultValue } = DefaultCssProperties[property]

    return (
      currentStyles[property] !== undefined &&
      currentStyles[property] !== defaultValue
    )
  }

  return {
    canReset,
    getCurrentStyle,
    resetStyle,
    setStyle,
  }
}
