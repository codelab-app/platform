import type { Nullable } from '@codelab/shared/abstract/types'
import type { BuilderWidthBreakPoint } from '../builder'
import type { CssMap } from './element.model.interface'

export enum ElementStylePseudoClass {
  None = 'none',
  Hover = 'hover',
  Focus = 'focus',
}

export interface IBreakpointStyle {
  cssString?: string
  guiString?: { [key in ElementStylePseudoClass]?: string }
}

export type IElementStyle = Record<
  BuilderWidthBreakPoint,
  IBreakpointStyle | undefined
>

export interface ElementCssRules {
  [key: string]: ElementCssRules | string
}

export interface IElementStyleModel {
  breakpointsByPrecedence: Array<BuilderWidthBreakPoint>
  customCss?: Nullable<string>
  /**
   * html-ready string that includes styles for all breakpoints
   * for production - uses media queries to apply styles
   * for development - uses container queries, for better UX
   */
  styleParsed: IElementStyle
  /**
   * styles that are inherited from other breakpoints,
   * for example, if we have a style for mobile, it will be inherited
   * for desktop, and this prop will display the inherited styles
   * when we edit the desktop breakpoint
   */
  stylesInheritedFromOtherBreakpoints: {
    currentStyles: ElementCssRules
    inheritedStyles: ElementCssRules
  }

  appendToGuiCss(selector: ElementStylePseudoClass, css: CssMap): void
  deleteFromGuiCss(
    selector: ElementStylePseudoClass,
    propNames: Array<string>,
  ): void
  guiCss(selector: ElementStylePseudoClass): Nullable<string>
  setCustomCss(css: string): void
}
