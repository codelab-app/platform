export enum EffectProperty {
  Blend = 'mix-blend-mode',
  Opacity = 'opacity',
}

export const DefaultEffectProperties = {
  [EffectProperty.Blend]: {
    defaultValue: 'normal',
    key: EffectProperty.Blend,
  },
  [EffectProperty.Opacity]: {
    defaultValue: 1,
    key: EffectProperty.Opacity,
  },
}
