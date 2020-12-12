import { pipe } from 'ramda'
import { propsFactoryEval } from './factories'
import { propsFilterRenderProps } from './filters'
import { Props } from '@codelab/alpha/shared/interface/props'

interface PropsData {
  current: Props
  parent: Props
  renderProps: Props
}

export class Prop {
  private _current: Props = {}

  private _parent: Props = {}

  /**
   * Should always be evaluated before passing down, since it needs parent context. If we pass down without evaluating, we'll need grand parent context, which is confusing.
   *
   * @private
   */
  private _renderProps: Props = {}

  constructor(data: PropsData) {
    const { current, parent, renderProps } = data

    this._current = current
    this._parent = parent
    this._renderProps = renderProps
  }

  /**
   * To be passed on for the next iteration
   */
  get propsToPassDown() {
    return pipe(
      propsFilterRenderProps,
      propsFactoryEval(this._renderProps),
    )({
      ...this._renderProps,
      ...this._current,
    })
  }

  /**
   * Get the props for the current component
   */
  get props() {
    return pipe(propsFactoryEval(this.propsToPassDown))({
      ...this._renderProps,
      ...this._parent,
      ...this._current,
    })
  }
}
