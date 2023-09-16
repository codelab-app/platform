import type { IElementModel } from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'

export const updateGuiCssProperty =
  (element: IElementModel, propName: string) => (val: Nullable<string>) => {
    if (val === null) {
      element.deleteFromGuiCss([propName])

      return
    }

    element.appendToGuiCss({
      [propName]: val,
    })
  }
