import { compose } from 'ramda'
import { basePropsPipe } from './basePropsPipe'
import { componentPipe } from './componentPipe'
import { conditionalRenderPipe } from './conditionalRenderPipe'
import { extraElementPropsPipe } from './extraElementPropsPipe'
import { extraPropsPipe } from './extraPropsPipe'
import { hookPipe } from './hookPipe'
import { loopingRenderPipe } from './loopRenderingPipe'
import { persistedPropsPipe } from './persistedPropsPipe'
import { propMapBindingsPipe } from './propMapBindingsPipe'
import { propsWithTypePipe } from './propsWithTypePipe'
import { propTransformationJsPipe } from './propTransformationJsPipe'
import { reactNodePipe } from './reactNodePipe'
import { renderAtomPipe } from './renderAtomPipe'
import { renderChildrenPipe } from './renderChildrenPipe'
import { renderPropsPipe } from './renderPropsPipe'

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
