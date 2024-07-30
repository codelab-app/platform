import { isRuntimeElementRef } from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend/infra/mobx'
import { useBuilderService } from '@codelab/frontend-application-builder/services'
import { useEffect, useState } from 'react'
import type { CssProperty } from './css'
import { DefaultCssProperties } from './css'

export const useStyle = () => {
  const { runtimeElementService } = useApplicationStore()
  const builderService = useBuilderService()

  const [currentStyles, setCurrentStyles] = useState<{
    [key: string]: string
  }>()

  const currentStylePseudoClass = runtimeElementService.currentStylePseudoClass

  useEffect(() => {
    loadCurrentStyles()
  }, [runtimeElementService.currentStylePseudoClass])

  const loadCurrentStyles = () => {
    if (
      builderService.selectedNode &&
      isRuntimeElementRef(builderService.selectedNode)
    ) {
      const newStyles = JSON.parse(
        builderService.selectedNode.current.style.guiCss(
          currentStylePseudoClass,
        ) || '{}',
      )

      setCurrentStyles(newStyles)

      return newStyles
    }
  }

  const getCurrentStyle = (property: CssProperty) => {
    let styles = currentStyles

    if (styles === undefined) {
      styles = loadCurrentStyles()
    }

    return styles?.[property] ?? DefaultCssProperties[property].defaultValue
  }

  // Set a new style value and update memoized styles
  const setStyle = (key: CssProperty, value: string) => {
    const { selectedNode } = builderService

    if (!selectedNode || !isRuntimeElementRef(selectedNode)) {
      return
    }

    const updatedStyles = { ...currentStyles, [key]: value }

    setCurrentStyles(updatedStyles)

    selectedNode.current.style.appendToGuiCss(currentStylePseudoClass, {
      [key]: value,
    })

    console.log(selectedNode.current.style.styleParsed)
  }

  const resetStyle = (property: CssProperty) => {
    // const { defaultValue } = DefaultCssProperties[property]

    removeStyles([property])
  }

  const canReset = (property: CssProperty) => {
    const { defaultValue } = DefaultCssProperties[property]

    return (
      currentStyles?.[property] !== undefined &&
      currentStyles[property] !== defaultValue
    )
  }

  const removeStyles = (properties: Array<CssProperty>) => {
    const { selectedNode } = builderService

    if (!selectedNode || !isRuntimeElementRef(selectedNode)) {
      return
    }

    selectedNode.current.style.deleteFromGuiCss(
      currentStylePseudoClass,
      properties,
    )

    loadCurrentStyles()
  }

  return {
    canReset,
    getCurrentStyle,
    removeStyles,
    resetStyle,
    setStyle,
  }
}
