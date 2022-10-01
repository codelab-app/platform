import { IElement } from '@codelab/frontend/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'

export const updateGuiCssProperty =
  (element: IElement, propName: string) => (val: Nullable<string>) => {
    if (val === null) {
      element.deleteFromGuiCss([propName])

      return
    }

    element.appendToGuiCss({
      [propName]: val,
    })
  }
