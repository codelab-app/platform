import { compose } from 'ramda'
import { basePropsPipe } from './pipes/basePropsPipe'
import { componentPipe } from './pipes/componentPipe'
import { conditionalRenderPipe } from './pipes/conditionalRenderPipe'
import { extraElementPropsPipe } from './pipes/extraElementPropsPipe'
import { extraPropsPipe } from './pipes/extraPropsPipe'
import { hookPipe } from './pipes/hookPipe'
import { loopingRenderPipe } from './pipes/loopRenderingPipe'
import { persistedPropsPipe } from './pipes/persistedPropsPipe'
import { propMapBindingsPipe } from './pipes/propMapBindingsPipe'
import { propsWithTypePipe } from './pipes/propsWithTypePipe'
import { propTransformationJsPipe } from './pipes/propTransformationJsPipe'
import { reactNodePipe } from './pipes/reactNodePipe'
import { renderAtomPipe } from './pipes/renderAtomPipe'
import { renderChildrenPipe } from './pipes/renderChildrenPipe'
import { renderPropsPipe } from './pipes/renderPropsPipe'

//
// Construct the pipeline:
//

// (1). Base props
const propsPipeline = compose(
  basePropsPipe,
  persistedPropsPipe,
  extraElementPropsPipe,
  propsWithTypePipe,
)

// (2).Prop transformers
const propModifiersPipeline = compose(
  hookPipe,
  propTransformationJsPipe,
  loopingRenderPipe,
  propMapBindingsPipe, // We want the propMapBindings to be last, so that we can pass any transformed/modified props down
)

// (3). All the pipes that output ReactElements
const elementPipeline = compose(
  renderPropsPipe,
  reactNodePipe,
  conditionalRenderPipe,
  renderAtomPipe,
  componentPipe,
)

// (4). Combine the pipelines and add the final renderChildrenPipe
export const renderPipeline = compose(
  propsPipeline,
  propModifiersPipeline,
  extraPropsPipe, // here are our 'global' builder props, which must override all other props, since we override onClick here
  elementPipeline,
)(renderChildrenPipe)
