export enum BorderProperty {
  Width = 'border-width',
  Style = 'border-style',
  Color = 'border-color',
  TopWidth = 'border-top-width',
  TopStyle = 'border-top-style',
  TopColor = 'border-top-color',
  RightWidth = 'border-right-width',
  RightStyle = 'border-right-style',
  RightColor = 'border-right-color',
  BottomWidth = 'border-bottom-width',
  BottomStyle = 'border-bottom-style',
  BottomColor = 'border-bottom-color',
  LeftWidth = 'border-left-width',
  LeftStyle = 'border-left-style',
  LeftColor = 'border-left-color',
  Radius = 'border-radius',
  TopLeftRadius = 'border-top-left-radius',
  TopRightRadius = 'border-top-right-radius',
  BottomRightRadius = 'border-bottom-right-radius',
  BottomLeftRadius = 'border-bottom-left-radius',
}

export const DefaultBorderProperties = {
  [BorderProperty.Width]: { defaultValue: 'medium', key: 'border-width' },
  [BorderProperty.Style]: { defaultValue: 'none', key: 'border-style' },
  [BorderProperty.Color]: { defaultValue: '#000000', key: 'border-color' },
  [BorderProperty.TopWidth]: {
    defaultValue: 'medium',
    key: 'border-top-width',
  },
  [BorderProperty.TopStyle]: {
    defaultValue: 'none',
    key: 'border-top-style',
  },
  [BorderProperty.TopColor]: {
    defaultValue: '#000000',
    key: 'border-top-color',
  },
  [BorderProperty.RightWidth]: {
    defaultValue: 'medium',
    key: 'border-right-width',
  },
  [BorderProperty.RightStyle]: {
    defaultValue: 'none',
    key: 'border-right-style',
  },
  [BorderProperty.RightColor]: {
    defaultValue: '#000000',
    key: 'border-right-color',
  },
  [BorderProperty.BottomWidth]: {
    defaultValue: 'medium',
    key: 'border-bottom-width',
  },
  [BorderProperty.BottomStyle]: {
    defaultValue: 'none',
    key: 'border-bottom-style',
  },
  [BorderProperty.BottomColor]: {
    defaultValue: '#000000',
    key: 'border-bottom-color',
  },
  [BorderProperty.LeftWidth]: {
    defaultValue: 'medium',
    key: 'border-left-width',
  },
  [BorderProperty.LeftStyle]: {
    defaultValue: 'none',
    key: 'border-left-style',
  },
  [BorderProperty.LeftColor]: {
    defaultValue: '#000000',
    key: 'border-left-color',
  },
  [BorderProperty.Radius]: { defaultValue: '0px', key: 'border-radius' },
  [BorderProperty.TopLeftRadius]: {
    defaultValue: '0px',
    key: 'border-top-left-radius',
  },
  [BorderProperty.TopRightRadius]: {
    defaultValue: '0px',
    key: 'border-top-right-radius',
  },
  [BorderProperty.BottomRightRadius]: {
    defaultValue: '0px',
    key: 'border-bottom-right-radius',
  },
  [BorderProperty.BottomLeftRadius]: {
    defaultValue: '0px',
    key: 'border-bottom-left-radius',
  },
}
