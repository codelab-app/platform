import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { ActionTypedValueTransformer } from './ActionTypedValueTransformer'
import { ElementTypedValueTransformer } from './ElementTypedValueTransformer'
import { RawTypedValuePropsTransformer } from './RawTypedValuePropsTransformer'
import { ReactNodeTypedValueTransformer } from './ReactNodeTypedValueTransformer'
import { RenderPropTypedValueTransformer } from './RenderPropTypedValueTransformer'

export const typedValueTransformersFactory =
  (): Array<ITypedValueTransformer> => [
    new ReactNodeTypedValueTransformer({}),
    new RenderPropTypedValueTransformer({}),
    new ElementTypedValueTransformer({}),
    new ActionTypedValueTransformer({}),
    new RawTypedValuePropsTransformer({}),
  ]
