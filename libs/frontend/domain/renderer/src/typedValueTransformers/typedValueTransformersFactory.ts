import type { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { ActionTypedValueTransformer } from './ActionTypedValueTransformer'
import { ElementTypedValueTransformer } from './ElementTypedValueTransformer'
import { RawTypedValuePropsTransformer } from './RawTypedValuePropsTransformer'
import { ReactNodeTypedValueTransformer } from './ReactNodeTypedValueTransformer'
import { RenderPropsTypedValueTransformer } from './RenderPropsTypedValueTransformer'

export const typedValueTransformersFactory =
  (): Array<ITypedValueTransformer> => [
    new ReactNodeTypedValueTransformer({}),
    new RenderPropsTypedValueTransformer({}),
    new ElementTypedValueTransformer({}),
    new ActionTypedValueTransformer({}),
    new RawTypedValuePropsTransformer({}),
  ]
