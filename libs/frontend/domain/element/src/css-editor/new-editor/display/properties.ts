export interface Property {
  default: number | string
  name: string
}

export enum DisplayProperties {
  Display = 'display',
  FlexDirection = 'flex-direction',
  FlexWrap = 'flex-wrap',
  RowGap = 'row-gap',
  ColumnGap = 'column-gap',
  AlignItems = 'align-items',
  AlignContent = 'align-content',
  JustifyItems = 'justify-items',
  JustifyContent = 'justify-content',
}

export const DefaultDisplayProperties = {
  [DisplayProperties.AlignItems]: {
    defaultValue: 'stretch',
    key: 'align-items',
  },
  [DisplayProperties.ColumnGap]: { defaultValue: '0px', key: 'column-gap' },
  [DisplayProperties.Display]: { defaultValue: 'flex', key: 'display' },
  [DisplayProperties.FlexDirection]: {
    defaultValue: 'row',
    key: 'flex-direction',
  },
  [DisplayProperties.FlexWrap]: { defaultValue: 'nowrap', key: 'flex-wrap' },
  [DisplayProperties.JustifyContent]: {
    defaultValue: 'flex-start',
    key: 'justify-content',
  },
  [DisplayProperties.RowGap]: { defaultValue: '0px', key: 'row-gap' },
  [DisplayProperties.AlignContent]: {
    defaultValue: 'stretch',
    key: 'align-content',
  },
  [DisplayProperties.JustifyItems]: {
    defaultValue: 'stretch',
    key: 'justify-items',
  },
}
