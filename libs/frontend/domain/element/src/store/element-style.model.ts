import type {
  ElementCssRules,
  IElementStyleModel,
} from '@codelab/frontend/abstract/domain'
import {
  BuilderWidthBreakPoint,
  CssMap,
  defaultBuilderWidthBreakPoints,
  IElementStyle,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { jsonStringToCss, parseCssStringIntoObject } from './utils'
import {
  getBuilderService,
  getRenderService,
} from '@codelab/frontend/abstract/application'

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
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const { guiString } = this.styleParsed[breakpoint] ?? {}

    return guiString
  }

  @computed
  get styleParsed(): IElementStyle {
    return JSON.parse(this.style || '{}')
  }

  @computed
  get styleStringWithBreakpoints(): string {
    const parsedCss = this.styleParsed
    const activeRenderer = this.renderService.activeRenderer?.current
    const rendererType = activeRenderer?.rendererType

    const isProduction =
      rendererType === RendererType.Production ||
      rendererType === RendererType.Preview

    const mediaQueryString = isProduction ? '@media' : '@container root'
    const breakpointStyles = []

    for (const breakpoint of this.breakpointsByPrecedence) {
      const breakpointStyle = parsedCss[breakpoint as BuilderWidthBreakPoint]

      const breakpointWidth =
        defaultBuilderWidthBreakPoints[breakpoint as BuilderWidthBreakPoint]

      const lowerBound =
        breakpoint === BuilderWidthBreakPoint.MobilePortrait
          ? 0
          : breakpointWidth.min

      if (breakpointStyle) {
        breakpointStyles.push(
          `${mediaQueryString} (width >= ${lowerBound}px) {
            ${breakpointStyle.cssString ?? ''}
            ${jsonStringToCss(breakpointStyle.guiString ?? '{}')}
          }`,
        )
      }
    }

    return breakpointStyles.join('\n')
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
      const guiObject = JSON.parse(guiString ?? '{}')

      inheritedStyles = { ...inheritedStyles, ...cssObject, ...guiObject }
    }

    const { cssString, guiString } = parsedStyle[currentBreakpoint] ?? {}
    const cssObject = parseCssStringIntoObject(cssString ?? '')
    const guiObject = JSON.parse(guiString ?? '{}')
    const currentStyles = { ...cssObject, ...guiObject }

    return { currentStyles, inheritedStyles }
  }

  @modelAction
  appendToGuiCss(css: CssMap) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    const curGuiCss = JSON.parse(this.guiCss || '{}')
    const newGuiCss = { ...curGuiCss, ...css }
    const guiString = JSON.stringify(newGuiCss)

    styleObject[breakpoint] = { ...styleObject[breakpoint], guiString }
    this.style = JSON.stringify(styleObject)
  }

  @modelAction
  deleteFromGuiCss(propNames: Array<string>) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed
    const curGuiCss = JSON.parse(this.guiCss || '{}')
    propNames.forEach((propName) => {
      if (curGuiCss[propName]) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete curGuiCss[propName]
      }
    })

    const guiString = JSON.stringify(curGuiCss)
    styleObject[breakpoint] = { ...styleObject[breakpoint], guiString }
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
    return getBuilderService(this)
  }

  @computed
  private get renderService() {
    return getRenderService(this)
  }
}
