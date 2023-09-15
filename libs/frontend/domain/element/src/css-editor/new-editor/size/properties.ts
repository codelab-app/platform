export enum SizeProperty {
  Width = 'width',
  Height = 'height',
  MinWidth = 'min-width',
  MinHeight = 'min-height',
  MaxWidth = 'max-width',
  MaxHeight = 'max-height',
  Overflow = 'overflow',
  Fit = 'object-fit',
}

export const DefaultSizeProperties = {
  [SizeProperty.Width]: { defaultValue: 'auto', key: 'width' },
  [SizeProperty.Height]: { defaultValue: 'auto', key: 'height' },
  [SizeProperty.MinWidth]: { defaultValue: 'auto', key: 'min-width' },
  [SizeProperty.MinHeight]: { defaultValue: 'auto', key: 'min-height' },
  [SizeProperty.MaxWidth]: { defaultValue: 'auto', key: 'max-width' },
  [SizeProperty.MaxHeight]: { defaultValue: 'auto', key: 'max-height' },
  [SizeProperty.Overflow]: { defaultValue: 'visible', key: 'overflow' },
  [SizeProperty.Fit]: { defaultValue: 'fill', key: 'object-fit' },
}
