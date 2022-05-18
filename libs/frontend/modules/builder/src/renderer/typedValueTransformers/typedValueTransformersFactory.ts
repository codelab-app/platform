import { IRenderService } from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'
import { ITypedValueTransformer } from '../abstract/ITypedValueTransformer'
import { ElementTypedValueTransformer } from './ElementTypedValueTransformer'
import { RawTypedValuePropsTransformer } from './RawTypedValuePropsTransformer'
import { ReactNodeTypedValueTransformer } from './ReactNodeTypedValueTransformer'
import { RenderPropsTypedValueTransformer } from './RenderPropsTypedValueTransformer'

export const typedValueTransformersFactory = (
  renderer: Ref<IRenderService>,
): Array<ITypedValueTransformer> => [
  new ReactNodeTypedValueTransformer({ renderer }),
  new RenderPropsTypedValueTransformer({ renderer }),
  new ElementTypedValueTransformer({ renderer }),
  new RawTypedValuePropsTransformer({ renderer }),
]
