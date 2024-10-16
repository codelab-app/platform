export enum CssProperty {
  AlignContent = 'align-content',
  AlignItems = 'align-items',
  // Background,
  BackgroundClip = 'background-clip',
  BackgroundColor = 'background-color',
  BorderBottomColor = 'border-bottom-color',
  BorderBottomLeftRadius = 'border-bottom-left-radius',
  BorderBottomRightRadius = 'border-bottom-right-radius',
  BorderBottomStyle = 'border-bottom-style',
  BorderBottomWidth = 'border-bottom-width',
  BorderColor = 'border-color',
  BorderLeftColor = 'border-left-color',
  BorderLeftStyle = 'border-left-style',
  BorderLeftWidth = 'border-left-width',
  BorderRadius = 'border-radius',
  BorderRightColor = 'border-right-color',
  BorderRightStyle = 'border-right-style',
  BorderRightWidth = 'border-right-width',
  BorderStyle = 'border-style',
  BorderTopColor = 'border-top-color',
  BorderTopLeftRadius = 'border-top-left-radius',
  BorderTopRightRadius = 'border-top-right-radius',
  BorderTopStyle = 'border-top-style',

  BorderTopWidth = 'border-top-width',
  // Border,
  BorderWidth = 'border-width',
  Bottom = 'bottom',
  Color = 'color',
  ColumnGap = 'column-gap',
  // Display
  Display = 'display',
  Fit = 'object-fit',
  FlexDirection = 'flex-direction',
  FlexWrap = 'flex-wrap',
  // Typography,
  FontFamily = 'font-family',

  FontSize = 'font-size',
  FontWeight = 'font-weight',
  Height = 'height',
  JustifyContent = 'justify-content',
  JustifyItems = 'justify-items',
  Left = 'left',
  LineHeight = 'line-height',
  Margin = 'margin',
  MarginBottom = 'margin-bottom',

  MarginLeft = 'margin-left',
  MarginRight = 'margin-right',

  MarginTop = 'margin-top',
  MaxHeight = 'max-height',
  MaxWidth = 'max-width',
  MinHeight = 'min-height',
  MinWidth = 'min-width',

  // Effects
  MixBlendMode = 'mix-blend-mode',
  Opacity = 'opacity',
  Overflow = 'overflow',
  // Padding & Margin,
  Padding = 'padding',
  PaddingBottom = 'padding-bottom',
  PaddingLeft = 'padding-left',
  PaddingRight = 'padding-right',
  PaddingTop = 'padding-top',

  // Position,
  Position = 'position',
  Right = 'right',
  RowGap = 'row-gap',
  TextAlign = 'text-align',
  TextDecoration = 'text-decoration',
  Top = 'top',
  // Size,
  Width = 'width',
}

export enum FlexAlignItems {
  Baseline = 'baseline',
  Center = 'center',
  End = 'flex-end',
  Start = 'flex-start',
  Stretch = 'stretch',
}

export enum FlexJustifyItems {
  Center = 'center',
  End = 'flex-end',
  SpaceAround = 'space-around',
  SpaceBetween = 'space-between',
  Start = 'flex-start',
}

export enum GridAlign {
  Center = 'center',
  End = 'end',
  SpaceAround = 'space-around',
  SpaceBetween = 'space-between',
  Start = 'start',
  Stretch = 'stretch',
}

export enum Display {
  Block = 'block',
  Flex = 'flex',
  Grid = 'grid',
  Inline = 'inline',
  InlineBlock = 'inline-block',
  None = 'None',
}

export const DefaultCssProperties: Record<
  CssProperty,
  { defaultValue: string; key: CssProperty }
> = {
  [CssProperty.AlignContent]: {
    defaultValue: 'stretch',
    key: CssProperty.AlignContent,
  },
  [CssProperty.AlignItems]: {
    defaultValue: 'stretch',
    key: CssProperty.AlignItems,
  },
  [CssProperty.BackgroundClip]: {
    defaultValue: 'border-box',
    key: CssProperty.BackgroundClip,
  },
  [CssProperty.BackgroundColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BackgroundColor,
  },
  [CssProperty.BorderBottomColor]: {
    defaultValue: 'transparent',
    key: CssProperty.BorderBottomColor,
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
  [CssProperty.Bottom]: {
    defaultValue: 'auto',
    key: CssProperty.Bottom,
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
  [CssProperty.Fit]: {
    defaultValue: 'cover',
    key: CssProperty.Fit,
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
  [CssProperty.Height]: {
    defaultValue: 'auto',
    key: CssProperty.Height,
  },
  [CssProperty.JustifyContent]: {
    defaultValue: 'flex-start',
    key: CssProperty.JustifyContent,
  },
  [CssProperty.JustifyItems]: {
    defaultValue: 'stretch',
    key: CssProperty.JustifyItems,
  },
  [CssProperty.Left]: {
    defaultValue: 'auto',
    key: CssProperty.Left,
  },
  [CssProperty.LineHeight]: {
    defaultValue: '1.2',
    key: CssProperty.LineHeight,
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
  [CssProperty.Position]: {
    defaultValue: 'static',
    key: CssProperty.Position,
  },

  [CssProperty.Right]: {
    defaultValue: 'auto',
    key: CssProperty.Right,
  },

  [CssProperty.RowGap]: {
    defaultValue: '0px',
    key: CssProperty.RowGap,
  },

  [CssProperty.TextAlign]: {
    defaultValue: 'left',
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

  [CssProperty.Width]: {
    defaultValue: 'auto',
    key: CssProperty.Width,
  },
}
