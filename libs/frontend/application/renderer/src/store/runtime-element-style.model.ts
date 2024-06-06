import type {
  ElementCssRules,
  IRuntimeElementStyleModel,
} from '@codelab/frontend/abstract/application'
import {
  BuilderWidthBreakPoint,
  CssMap,
  defaultBuilderWidthBreakPoints,
  ElementStylePseudoClass,
  getBuilderService,
  getRendererService,
  IElementStyle,
  RendererType,
} from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import type { Ref } from 'mobx-keystone'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import { jsonStringToCss, parseCssStringIntoObject } from './style.utils'

@model('@codelab/RuntimeElementStyle')
export class RuntimeElementStyle
  extends Model({
    builderStyle: prop<Maybe<string>>().withSetter(),
    element: prop<Ref<IElementModel>>(),
  })
  implements IRuntimeElementStyleModel
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
  get renderService() {
    return getRendererService(this)
  }

  @computed
  get renderer() {
    const activeRenderer = this.renderService.activeRenderer?.current

    if (!activeRenderer) {
      throw new Error('No active Renderer was found')
    }

    return activeRenderer
  }

  @computed
  get styleParsed(): IElementStyle {
    return JSON.parse(this.element.current.style || '{}')
  }

  @computed
  get styleStringWithBreakpoints(): string {
    const rendererType = this.renderer.rendererType

    const isProduction =
      rendererType === RendererType.Production ||
      rendererType === RendererType.Preview

    const breakpointStyles = []

    for (const breakpoint of this.breakpointsByPrecedence) {
      const breakpointStyle = this.styleParsed[breakpoint]
      const breakpointWidth = defaultBuilderWidthBreakPoints[breakpoint]

      const lowerBound =
        breakpoint === BuilderWidthBreakPoint.MobilePortrait
          ? 0
          : breakpointWidth.min

      if (breakpointStyle) {
        breakpointStyles.push(
          `@container root (min-width: ${lowerBound}px) {
              ${breakpointStyle.cssString ?? ''}
              ${jsonStringToCss(
                breakpointStyle.guiString?.[ElementStylePseudoClass.None] ??
                  '{}',
              )}
              &:hover {
                ${jsonStringToCss(
                  breakpointStyle.guiString?.[ElementStylePseudoClass.Hover] ??
                    '{}',
                )}
              }
              &:focus {
                ${jsonStringToCss(
                  breakpointStyle.guiString?.[ElementStylePseudoClass.Focus] ??
                    '{}',
                )}
              }
              .ce-inline-toolbar { color: initial; }
            }`,
        )
      }
    }

    const styleWithBreakPoints = breakpointStyles.join('\n')

    return isProduction || !this.builderStyle
      ? styleWithBreakPoints
      : [styleWithBreakPoints, this.builderStyle].join('\n')
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
    this.element.current.setStyle(JSON.stringify(styleObject))
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
    this.element.current.setStyle(JSON.stringify(styleObject))
  }

  @modelAction
  setCustomCss(cssString: string) {
    const breakpoint = this.builderService.selectedBuilderBreakpoint
    const styleObject = this.styleParsed

    styleObject[breakpoint] = { ...styleObject[breakpoint], cssString }
    this.element.current.setStyle(JSON.stringify(styleObject))
  }

  toString() {
    return this.element.current.style || ''
  }

  @computed
  private get builderService() {
    return getBuilderService(this)
  }
}