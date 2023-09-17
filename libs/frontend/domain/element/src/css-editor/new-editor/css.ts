export enum CssProperty {
  // Background,
  BackgroundClip = 'background-clip',
  BackgroundColor = 'background-color',
  // Border,
  BorderWidth = 'border-width',
  BorderBottomLeftRadius = 'border-bottom-left-radius',
  BorderLeftStyle = 'border-left-style',
  BorderTopWidth = 'border-top-width',
  BorderLeftWidth = 'border-left-width',
  BorderTopColor = 'border-top-color',
  BorderRadius = 'border-radius',
  BorderRightStyle = 'border-right-style',
  BorderTopLeftRadius = 'border-top-left-radius',
  BorderTopRightRadius = 'border-top-right-radius',
  BorderColor = 'border-color',
  BorderRightColor = 'border-right-color',
  BorderBottomStyle = 'border-bottom-style',
  BorderRightWidth = 'border-right-width',
  BorderBottomColor = 'border-bottom-color',
  BorderStyle = 'border-style',
  BorderBottomWidth = 'border-bottom-width',
  BorderTopStyle = 'border-top-style',
  BorderLeftColor = 'border-left-color',
  BorderBottomRightRadius = 'border-bottom-right-radius',

  // Padding & Margin,
  Padding = 'padding',
  Margin = 'margin',
  PaddingTop = 'padding-top',
  PaddingRight = 'padding-right',
  PaddingBottom = 'padding-bottom',
  PaddingLeft = 'padding-left',
  MarginTop = 'margin-top',
  MarginRight = 'margin-right',
  MarginBottom = 'margin-bottom',
  MarginLeft = 'margin-left',

  // Display
  Display = 'display',
  FlexDirection = 'flex-direction',
  FlexWrap = 'flex-wrap',
  RowGap = 'row-gap',
  ColumnGap = 'column-gap',
  AlignItems = 'align-items',
  AlignContent = 'align-content',
  JustifyItems = 'justify-items',
  JustifyContent = 'justify-content',

  // Effects
  MixBlendMode = 'mix-blend-mode',
  Opacity = 'opacity',

  // Position,
  Position = 'position',
  Top = 'top',
  Right = 'right',
  Bottom = 'bottom',
  Left = 'left',

  // Size,
  Width = 'width',
  Height = 'height',
  MinWidth = 'min-width',
  MinHeight = 'min-height',
  MaxWidth = 'max-width',
  MaxHeight = 'max-height',
  Overflow = 'overflow',
  Fit = 'object-fit',

  // Typography,
  FontFamily = 'font-family',
  FontSize = 'font-size',
  FontWeight = 'font-weight',
  LineHeight = 'line-height',
  TextAlign = 'text-align',
  TextDecoration = 'text-decoration',
  Color = 'color',
}

export const DefaultCssProperties: Record<
  CssProperty,
  { defaultValue: string; key: CssProperty }
> = {
  [CssProperty.BackgroundColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BackgroundColor,
  },
  [CssProperty.BackgroundClip]: {
    defaultValue: 'border-box',
    key: CssProperty.BackgroundClip,
  },
  [CssProperty.BorderBottomLeftRadius]: {
    defaultValue: '0px',
    key: CssProperty.BorderBottomLeftRadius,
  },
  [CssProperty.BorderBottomRightRadius]: {
    defaultValue: '0px',
    key: CssProperty.BorderBottomRightRadius,
  },
  [CssProperty.BorderBottomStyle]: {
    defaultValue: 'none',
    key: CssProperty.BorderBottomStyle,
  },
  [CssProperty.BorderBottomWidth]: {
    defaultValue: '0px',
    key: CssProperty.BorderBottomWidth,
  },
  [CssProperty.BorderColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BorderColor,
  },
  [CssProperty.BorderLeftColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BorderLeftColor,
  },
  [CssProperty.BorderLeftStyle]: {
    defaultValue: 'none',
    key: CssProperty.BorderLeftStyle,
  },
  [CssProperty.BorderLeftWidth]: {
    defaultValue: '0px',
    key: CssProperty.BorderLeftWidth,
  },
  [CssProperty.BorderRadius]: {
    defaultValue: '0px',
    key: CssProperty.BorderRadius,
  },
  [CssProperty.BorderRightColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BorderRightColor,
  },
  [CssProperty.BorderRightStyle]: {
    defaultValue: 'none',
    key: CssProperty.BorderRightStyle,
  },
  [CssProperty.BorderRightWidth]: {
    defaultValue: '0px',
    key: CssProperty.BorderRightWidth,
  },
  [CssProperty.BorderBottomColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BorderBottomColor,
  },
  [CssProperty.BorderStyle]: {
    defaultValue: 'none',
    key: CssProperty.BorderStyle,
  },
  [CssProperty.BorderTopColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BorderTopColor,
  },
  [CssProperty.BorderTopLeftRadius]: {
    defaultValue: '0px',
    key: CssProperty.BorderTopLeftRadius,
  },
  [CssProperty.BorderTopRightRadius]: {
    defaultValue: '0px',
    key: CssProperty.BorderTopRightRadius,
  },
  [CssProperty.BorderTopStyle]: {
    defaultValue: 'none',
    key: CssProperty.BorderTopStyle,
  },
  [CssProperty.BorderTopWidth]: {
    defaultValue: '0px',
    key: CssProperty.BorderTopWidth,
  },
  [CssProperty.BorderWidth]: {
    defaultValue: '0px',
    key: CssProperty.BorderWidth,
  },
  [CssProperty.Color]: {
    defaultValue: 'inherit',
    key: CssProperty.Color,
  },
  [CssProperty.ColumnGap]: {
    defaultValue: '0px',
    key: CssProperty.ColumnGap,
  },
  [CssProperty.Display]: {
    defaultValue: 'block',
    key: CssProperty.Display,
  },
  [CssProperty.RowGap]: {
    defaultValue: '0px',
    key: CssProperty.RowGap,
  },
  [CssProperty.Fit]: {
    defaultValue: 'cover',
    key: CssProperty.Fit,
  },
  [CssProperty.AlignItems]: {
    defaultValue: 'stretch',
    key: CssProperty.AlignItems,
  },
  [CssProperty.AlignContent]: {
    defaultValue: 'stretch',
    key: CssProperty.AlignContent,
  },
  [CssProperty.JustifyItems]: {
    defaultValue: 'stretch',
    key: CssProperty.JustifyItems,
  },
  [CssProperty.FlexDirection]: {
    defaultValue: 'row',
    key: CssProperty.FlexDirection,
  },
  [CssProperty.FlexWrap]: {
    defaultValue: 'nowrap',
    key: CssProperty.FlexWrap,
  },
  [CssProperty.FontFamily]: {
    defaultValue: 'Montserrat',
    key: CssProperty.FontFamily,
  },
  [CssProperty.FontSize]: {
    defaultValue: '16px',
    key: CssProperty.FontSize,
  },
  [CssProperty.FontWeight]: {
    defaultValue: '400',
    key: CssProperty.FontWeight,
  },
  [CssProperty.LineHeight]: {
    defaultValue: '1.2',
    key: CssProperty.LineHeight,
  },
  [CssProperty.Height]: {
    defaultValue: 'auto',
    key: CssProperty.Height,
  },
  [CssProperty.Width]: {
    defaultValue: 'auto',
    key: CssProperty.Width,
  },
  [CssProperty.JustifyContent]: {
    defaultValue: 'flex-start',
    key: CssProperty.JustifyContent,
  },
  [CssProperty.Left]: {
    defaultValue: 'auto',
    key: CssProperty.Left,
  },
  [CssProperty.MaxHeight]: {
    defaultValue: 'auto',
    key: CssProperty.MaxHeight,
  },
  [CssProperty.MaxWidth]: {
    defaultValue: 'auto',
    key: CssProperty.MaxWidth,
  },
  [CssProperty.MinHeight]: {
    defaultValue: 'auto',
    key: CssProperty.MinHeight,
  },
  [CssProperty.MinWidth]: {
    defaultValue: 'auto',
    key: CssProperty.MinWidth,
  },
  [CssProperty.MixBlendMode]: {
    defaultValue: 'normal',
    key: CssProperty.MixBlendMode,
  },
  [CssProperty.Opacity]: {
    defaultValue: '100%',
    key: CssProperty.Opacity,
  },
  [CssProperty.Overflow]: {
    defaultValue: 'visible',
    key: CssProperty.Overflow,
  },
  [CssProperty.Padding]: {
    defaultValue: '0px',
    key: CssProperty.Padding,
  },
  [CssProperty.PaddingBottom]: {
    defaultValue: '0px',
    key: CssProperty.PaddingBottom,
  },
  [CssProperty.PaddingLeft]: {
    defaultValue: '0px',
    key: CssProperty.PaddingLeft,
  },

  [CssProperty.PaddingRight]: {
    defaultValue: '0px',
    key: CssProperty.PaddingRight,
  },
  [CssProperty.PaddingTop]: {
    defaultValue: '0px',
    key: CssProperty.PaddingTop,
  },
  [CssProperty.Margin]: {
    defaultValue: '0px',
    key: CssProperty.Margin,
  },
  [CssProperty.MarginBottom]: {
    defaultValue: '0px',
    key: CssProperty.MarginBottom,
  },
  [CssProperty.MarginLeft]: {
    defaultValue: '0px',
    key: CssProperty.MarginLeft,
  },
  [CssProperty.MarginRight]: {
    defaultValue: '0px',
    key: CssProperty.MarginRight,
  },
  [CssProperty.MarginTop]: {
    defaultValue: '0px',
    key: CssProperty.MarginTop,
  },

  [CssProperty.Position]: {
    defaultValue: 'static',
    key: CssProperty.Position,
  },

  [CssProperty.Right]: {
    defaultValue: 'auto',
    key: CssProperty.Right,
  },

  [CssProperty.TextAlign]: {
    defaultValue: 'inherit',
    key: CssProperty.TextAlign,
  },

  [CssProperty.TextDecoration]: {
    defaultValue: 'none',
    key: CssProperty.TextDecoration,
  },
  [CssProperty.Top]: {
    defaultValue: 'auto',
    key: CssProperty.Top,
  },

  [CssProperty.Bottom]: {
    defaultValue: 'auto',
    key: CssProperty.Bottom,
  },
}
