import type { ITypedValueTransformer } from '../abstract/i-typed-value-transformer'
import { ActionTypedValueTransformer } from './action-typed-value-transformer'
import { ElementTypedValueTransformer } from './element-typed-value-transformer'
import { RawTypedValuePropsTransformer } from './raw-typed-value-props-transformer'
import { ReactNodeTypedValueTransformer } from './react-node-typed-value-transformer'
import { RenderPropTypedValueTransformer } from './render-prop-typed-value-transformer'

export const typedValueTransformersFactory =
  (): Array<ITypedValueTransformer> => [
    new ReactNodeTypedValueTransformer({}),
    new RenderPropTypedValueTransformer({}),
    new ElementTypedValueTransformer({}),
    new ActionTypedValueTransformer({}),
    new RawTypedValuePropsTransformer({}),
  ]
