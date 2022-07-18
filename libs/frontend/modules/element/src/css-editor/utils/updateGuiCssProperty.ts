import { IElement } from '@codelab/shared/abstract/core'

export const updateGuiCssProperty =
  (element: IElement, propName: string) => (val: string) => {
    if (val === 'none') {
      element.deleteFromGuiCss([propName])
    }

    element.appendToGuiCss({
      [propName]: val,
    })
  }
