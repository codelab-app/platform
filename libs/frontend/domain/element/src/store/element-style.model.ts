import type {
  ElementCssRules,
  IElementStyleModel,
} from '@codelab/frontend/abstract/domain'
import {
  BuilderWidthBreakPoint,
  CssMap,
  ElementStylePseudoClass,
  getBuilderDomainService,
  IElementStyle,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { parseCssStringIntoObject } from './utils'

@model('@codelab/ElementStyle')
export class ElementStyle
  extends Model({
    style: prop<Nullable<string>>(null).withSetter(),
  })
  implements IElementStyleModel
{
  get breakpointsByPrecedence() {
    const breakpoints = [
      BuilderWidthBreakPoint.MobilePortrait,
      BuilderWidthBreakPoint.MobileLandscape,
      BuilderWidthBreakPoint.Tablet,
      BuilderWidthBreakPoint.Desktop,
    ]

    return breakpoints
  }

  @computed
  get customCss() {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const { cssString } = this.styleParsed[breakpoint] ?? {}

    return cssString
  }

  @computed
  get guiCss() {
    return (pseudoClass: ElementStylePseudoClass) => {
      const breakpoint = this.builderService.selectedBuilderBreakpoint
      const { guiString } = this.styleParsed[breakpoint] ?? {}

      return guiString?.[pseudoClass] ?? '{}'
    }
  }

  @computed
  get styleParsed(): IElementStyle {
    return JSON.parse(this.style || '{}')
  }

  @computed
  get stylesInheritedFromOtherBreakpoints() {
    const currentBreakpoint = this.builderService.selectedBuilderBreakpoint
    const parsedStyle = this.styleParsed
    let inheritedStyles = {} as ElementCssRules

    for (const breakpoint of this.breakpointsByPrecedence) {
      if (breakpoint === currentBreakpoint) {
        break
      }

      const { cssString, guiString } = parsedStyle[breakpoint] ?? {}
      const cssObject = parseCssStringIntoObject(cssString ?? '')
      const guiObject = JSON.parse(guiString?.none ?? '{}')

      inheritedStyles = { ...inheritedStyles, ...cssObject, ...guiObject }
    }

    const { cssString, guiString } = parsedStyle[currentBreakpoint] ?? {}
    const cssObject = parseCssStringIntoObject(cssString ?? '')
    const guiObject = JSON.parse(guiString?.none ?? '{}')
    const currentStyles = { ...cssObject, ...guiObject }

    return { currentStyles, inheritedStyles }
  }

  @modelAction
  appendToGuiCss(pseudoClass: ElementStylePseudoClass, css: CssMap) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    const curGuiCss = JSON.parse(this.guiCss(pseudoClass) || '{}')
    const newGuiCss = { ...curGuiCss, ...css }
    const guiString = JSON.stringify(newGuiCss)

    styleObject[breakpoint] = {
      ...styleObject[breakpoint],
      guiString: {
        ...styleObject[breakpoint]?.guiString,
        [pseudoClass]: guiString,
      },
    }
    this.style = JSON.stringify(styleObject)
  }

  @modelAction
  deleteFromGuiCss(
    pseudoClass: ElementStylePseudoClass,
    propNames: Array<string>,
  ) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    const curGuiCss = JSON.parse(this.guiCss(pseudoClass) || '{}')

    propNames.forEach((propName) => {
      if (curGuiCss[propName]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete curGuiCss[propName]
      }
    })

    const guiString = JSON.stringify(curGuiCss)

    styleObject[breakpoint] = {
      ...styleObject[breakpoint],
      guiString: {
        ...styleObject[breakpoint]?.guiString,
        [pseudoClass]: guiString,
      },
    }
    this.style = JSON.stringify(styleObject)
  }

  @modelAction
  setCustomCss(cssString: string) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed

    styleObject[breakpoint] = { ...styleObject[breakpoint], cssString }
    this.style = JSON.stringify(styleObject)
  }

  toString() {
    return this.style || ''
  }

  @computed
  private get builderService() {
    return getBuilderDomainService(this)
  }
}
