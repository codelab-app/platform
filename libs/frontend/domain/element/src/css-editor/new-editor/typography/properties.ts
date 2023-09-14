export enum TypographyProperty {
  Family = 'font-family',
  Size = 'font-size',
  Weight = 'font-weight',
  Height = 'line-height',
  Align = 'text-align',
  Decoration = 'text-decoration',
  Color = 'color',
}

export const DefaultTypographyProperties = {
  [TypographyProperty.Family]: {
    defaultValue: 'Montserrat',
    key: 'font-family',
  },
  [TypographyProperty.Size]: { defaultValue: '16px', key: 'font-size' },
  [TypographyProperty.Weight]: { defaultValue: '400', key: 'font-weight' },
  [TypographyProperty.Height]: { defaultValue: '1.2', key: 'line-height' },
  [TypographyProperty.Align]: { defaultValue: 'left', key: 'text-align' },
  [TypographyProperty.Decoration]: {
    defaultValue: 'none',
    key: 'text-decoration',
  },
  [TypographyProperty.Color]: { defaultValue: '#000000', key: 'color' },
}
