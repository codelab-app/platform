export interface Property {
  default: number | string
  name: string
}

export enum DisplayProperty {
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
  [DisplayProperty.AlignItems]: {
    defaultValue: 'stretch',
    key: 'align-items',
  },
  [DisplayProperty.ColumnGap]: { defaultValue: '0px', key: 'column-gap' },
  [DisplayProperty.Display]: { defaultValue: 'flex', key: 'display' },
  [DisplayProperty.FlexDirection]: {
    defaultValue: 'row',
    key: 'flex-direction',
  },
  [DisplayProperty.FlexWrap]: { defaultValue: 'nowrap', key: 'flex-wrap' },
  [DisplayProperty.JustifyContent]: {
    defaultValue: 'flex-start',
    key: 'justify-content',
  },
  [DisplayProperty.RowGap]: { defaultValue: '0px', key: 'row-gap' },
  [DisplayProperty.AlignContent]: {
    defaultValue: 'stretch',
    key: 'align-content',
  },
  [DisplayProperty.JustifyItems]: {
    defaultValue: 'stretch',
    key: 'justify-items',
  },
}
