import type { BuilderWidthBreakPoint } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'

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

export interface CssMap {
  [prop: string]: string
}

export interface IRuntimeElementStyleModel {
  breakpointsByPrecedence: Array<BuilderWidthBreakPoint>
  /**
   * a style added by the builder behind the scenes
   * main use case set element min height for text editor to be visible on editing
   */
  builderStyle?: string
  customCss?: Nullable<string>
  /**
   * html-ready string that includes styles for all breakpoints
   * for production - uses media queries to apply styles
   * for development - uses container queries, for better UX
   */
  styleParsed: IElementStyle
  styleStringWithBreakpoints: string
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
  setBuilderStyle(css: string): void
  setCustomCss(css: string): void
}
