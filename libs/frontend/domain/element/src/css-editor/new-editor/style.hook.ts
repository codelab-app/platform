// import { isElementRef } from '@codelab/frontend/abstract/core'
// import { useStore } from '@codelab/frontend/presentation/container'
// import type { CssProperty } from './css'
// import { DefaultCssProperties } from './css'
//
// export const useStyle = () => {
//   const { builderService } = useStore()
//
//   const getCurrentStyle = (property: CssProperty) => {
//     const { selectedNode } = builderService
//     const defaultValue = DefaultCssProperties[property].defaultValue
//
//     if (!isElementRef(selectedNode)) {
//       return defaultValue
//     }
//
//     const { guiCss } = selectedNode.current
//
//     if (guiCss) {
//       return JSON.parse(guiCss)[property] ?? defaultValue
//     }
//
//     return defaultValue
//   }
//
//   const setStyle = (key: string, value: string) => {
//     const { selectedNode } = builderService
//
//     if (!isElementRef(selectedNode)) {
//       return
//     }
//
//     selectedNode.current.appendToGuiCss({ [key]: value })
//   }
//
//   // const resetStyle = (property: CssProperty) => {
//   //
//   // }
//
//   return {
//     getCurrentStyle,
//     setStyle,
//   }
// }
import { isElementRef } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presentation/container'
import { useEffect, useState } from 'react'
import type { CssProperty } from './css'
import { DefaultCssProperties } from './css'

export const useStyle = () => {
  const { builderService } = useStore()

  const [currentStyles, setCurrentStyles] = useState<{
    [key: string]: string
  }>({})

  useEffect(() => {
    if (isElementRef(builderService.selectedNode)) {
      const newStyles = JSON.parse(
        builderService.selectedNode.current.guiCss || '{}',
      )

      setCurrentStyles(newStyles)
    }
  }, [builderService.selectedNode])

  const getCurrentStyle = (property: CssProperty) => {
    const defaultValue = DefaultCssProperties[property].defaultValue

    return currentStyles[property] ?? defaultValue
  }

  // Set a new style value and update memoized styles
  const setStyle = (key: CssProperty, value: string) => {
    const { selectedNode } = builderService

    if (!isElementRef(selectedNode)) {
      return
    }

    const updatedStyles = { ...currentStyles, [key]: value }
    setCurrentStyles(updatedStyles)

    selectedNode.current.appendToGuiCss(updatedStyles)
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
