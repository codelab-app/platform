import { ElementTree, elementTreeRef } from '@codelab/frontend/modules/element'
import { getTypeService } from '@codelab/frontend/modules/type'
import { getComponentService } from '@codelab/frontend/presenter/container'
import {
  IElement,
  IElementTree,
  IPropData,
  IRenderOutput,
  IRenderPipe,
  IRenderService,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Nullable, Nullish } from '@codelab/shared/abstract/types'
import {
  deepReplaceObjectValues,
  deepReplaceObjectValuesAndKeys,
  mergeProps,
} from '@codelab/shared/utils'
import { flatMap, isEmpty, isString, values } from 'lodash'
import { computed } from 'mobx'
import {
  _async,
  _await,
  AnyModel,
  detach,
  getSnapshot,
  Model,
  model,
  modelAction,
  ModelClass,
  modelFlow,
  prop,
  Ref,
  rootRef,
} from 'mobx-keystone'
import { createTransformer } from 'mobx-utils'
import React, { ComponentType, ReactElement, ReactNode } from 'react'
import { ArrayOrSingle } from 'ts-essentials'
import { atoms } from '../atoms/atoms'
import { ITypedValueTransformer } from './abstract/ITypedValueTransformer'
import { ElementWrapper, ElementWrapperProps } from './element/ElementWrapper'
import { ExtraElementProps } from './ExtraElementProps'
import { renderPipeFactory } from './renderPipes/renderPipeFactory'
import { typedValueTransformersFactory } from './typedValueTransformers/typedValueTransformersFactory'
import { getState } from './utils'
import { isTypedValue } from './utils/isTypedValue'
import { reduceComponentTree } from './utils/reduceComponentTree'
import { mapOutput } from './utils/renderOutputUtils'

const initForBuilder = () => {
  // return new RenderService({
  //   extraElementProps: new ExtraElementProps({
  //     global: frozen(globalProps),
  //   }),
  // }),
}

/**
 * Handles the logic of rendering a tree of models
 *
 * NB! call .init() and wait for it to finish before using .render()
 *
 * Calling .render() renders a single Element (without it's children)
 * This ensures that each render() call can be used for a single isolated observer() - wrapped React Element
 * and it will get re-rendered only if the source Element model is changed
 *
 * The renderPipe and typedValueTransformers replace the previous render pipeline.
 * It's useful to keep them as mobx-keystone models because they can access the context of the state tree
 * which in practice can act as a DI container, so we can get outside data in the render pipeline easily.
 * For example - we use the renderContext from ./renderContext inside the pipes to get the renderer model itself and its tree.
 */
@model('@codelab/RenderService')
export class RenderService
  extends Model(
    {
      /**
       * The tree that's being rendered
       */
      treeRef: prop<Nullable<Ref<ElementTree>>>(() => null),

      /**
       * A tree of providers that will get rendered before all of the regular elements
       */
      providerTreeRef: prop<Nullable<Ref<ElementTree>>>(() => null),

      /**
       * Props passed to specific elements, such as from global props context
       */
      extraElementProps: prop(() => new ExtraElementProps({})),

      /**
       * Those transform different kinds of typed values into render-ready props
       */
      typedValueTransformers: prop<Array<ITypedValueTransformer>>(
        typedValueTransformersFactory,
      ),

      /**
       * The render pipe handles and augments the render process.
       */
      renderPipe: prop<IRenderPipe>(renderPipeFactory),

      isInitialized: prop(() => false),

      /**
       * Will log the render output and render pipe info to the console
       */
      debugMode: prop(false).withSetter(),
    },
    {
      toSnapshotProcessor(sn, modelInstance) {
        return {
          ...sn,
          // Remove those, because they are runtime only and not serializable
          extraElementProps: getSnapshot(new ExtraElementProps({})),
        }
      },
    },
  )
  implements IRenderService
{
  // Set to any observable that will act as a source for the state of the rendered app
  public platformState?: any

  @modelFlow
  init = _async(function* (
    this: RenderService,
    tree: IElementTree,
    providerTree?: Nullable<IElementTree>,
    platformState?: Nullish<ModelClass<AnyModel>>,
  ) {
    if (this.isInitialized) {
      return
    }

    this.treeRef = elementTreeRef(tree.id)
    this.providerTreeRef = providerTree ? elementTreeRef(providerTree.id) : null
    this.platformState = platformState

    /*
     * Make sure all types are fetched first, because we need
     * them when transforming the rendered props. We could cache
     * the common types in the browser later on
     */
    const typeStore = getTypeService(this)

    yield* _await(typeStore.getAll())

    const componentIds = tree.elementsList.flatMap((x) =>
      values(x.props?.values)
        .filter((p) => {
          const typeKind = this.getTypeKindById(p.type)

          const componentsTypeKinds = [
            ITypeKind.ReactNodeType,
            ITypeKind.RenderPropsType,
          ]

          return typeKind && componentsTypeKinds.includes(typeKind)
        })
        .map((renderProp) => renderProp.value),
    )

    const componentService = getComponentService(this)

    const components = yield* _await(
      componentService.getAll({ id_IN: componentIds }),
    )

    yield* _await(
      Promise.all(
        // keep the main tree root as it is.
        components.map((c) => tree),
      ),
    )

    this.isInitialized = true
  })

  /**
   * Like init, but skips the type fetching
   * Useful if you're sure that all types are already fetched
   * or for unit testing
   */
  @modelAction
  initForce(
    tree: ElementTree,
    // pass in a observable
    platformState?: any,
  ) {
    this.treeRef = elementTreeRef(tree)
    this.platformState = platformState
    this.isInitialized = true
  }

  @computed
  get tree() {
    return this.treeRef?.current ?? null
  }

  /**
   * @link renderRoot
   */
  renderRoot() {
    const root = this.tree?.root

    if (!root) {
      console.warn('Renderer: No root element found')

      return null
    }

    const rootElement = this.renderElement(root)

    return this.renderWithProviders(rootElement)
  }

  /**
   * Takes the provider tree and wrap it around our root element
   */
  private renderWithProviders(rootElement: ReactElement) {
    const providerRoot = this.providerTreeRef?.current?.root

    const providerElements = providerRoot
      ? [providerRoot, ...(providerRoot?.leftHandDescendants ?? [])]
      : []

    const providerOutputsMaybeArray = providerElements.map((element) =>
      this.renderIntermediateElement(element),
    )

    const providerOutputs = flatMap(providerOutputsMaybeArray, (o) =>
      mapOutput(o, (io) => io),
    ).filter((o): o is IRenderOutput => !!o)

    const Providers = reduceComponentTree(
      providerOutputs
        .map((output) =>
          output.atomType ? [atoms[output.atomType], output.props] : null,
        )
        .filter((x): x is [ComponentType, IPropData] => !!x),
    )

    return React.createElement(Providers, {}, rootElement)
  }

  /**
   * Renders a single Element using the provided RenderAdapter
   */
  renderElement = (element: IElement, extraProps?: IPropData): ReactElement => {
    const wrapperProps: ElementWrapperProps & { key: string } = {
      key: `element-wrapper-${element.id}`,
      renderService: this,
      element,
      extraProps,
    }

    return React.createElement(ElementWrapper, wrapperProps)
  }

  /**
   * Renders a single element (without its children) to an intermediate RenderOutput
   *
   * @param extraProps props passed down from parent components, these have high priority than element.props
   */
  renderIntermediateElement = (
    element: IElement,
    extraProps?: IPropData,
  ): ArrayOrSingle<IRenderOutput> => {
    let props = mergeProps(
      element.__metadataProps,
      element.props?.values,
      extraProps,
      this.extraElementProps.getForElement(element.id),
    )

    props = this.processPropsForRender(props, element)

    /**
     * Pass down global props
     */
    const { globalProps } = element.applyPropMapBindings(props)

    const appendGlobalProps = (renderOutput: IRenderOutput) => {
      const mergedGlobalProps = mergeProps(
        renderOutput.globalProps,
        globalProps,
      )

      return isEmpty(mergedGlobalProps)
        ? renderOutput
        : {
            ...renderOutput,
            globalProps: mergedGlobalProps,
          }
    }

    const output = this.renderPipe.render(element, props)

    return mapOutput(output, appendGlobalProps)
  }

  /** Renders the elements children */
  renderChildren = createTransformer(
    (parentOutput: IRenderOutput): ArrayOrSingle<ReactNode> => {
      const element = this.tree?.element(parentOutput.elementId)

      if (!element) {
        console.warn(
          `RenderService: Element ${parentOutput.elementId} not found in tree`,
        )

        return undefined
      }

      const children = element.childrenSorted?.map((child) =>
        this.renderElement(child),
      )

      const hasChildren = Array.isArray(children)
        ? children.length > 0
        : !!children

      if (!hasChildren) {
        /*
         * It's important to be undefined if we have no children to display,
         * since void components like input will throw an error if their children prop isn't undefined
         */
        return undefined
      }

      /*
       * If we have only one child, just return it.
       * Ant Design doesn't handle array children well in some cases, like Forms
       */
      if (Array.isArray(children) && children.length === 1) {
        return children[0]
      }

      return children
    },
  )

  logRendered = (element: IElement, rendered: ArrayOrSingle<IRenderOutput>) => {
    if (this.debugMode) {
      console.dir({ element: element, rendered })
    }
  }

  /**
   * Parses and transforms the props for a given element, so they are ready for rendering
   */
  private processPropsForRender = (props: IPropData, element: IElement) => {
    props = this.applyPropTypeTransformers(props)
    props = element.executePropTransformJs(props)
    props = this.replaceStateInProps(props)

    const { localProps } = element.applyPropMapBindings(props)
    props = mergeProps(props, localProps)

    return props
  }

  private replaceStateInProps = (props: IPropData) => {
    if (!this.platformState) {
      return props
    }

    return deepReplaceObjectValuesAndKeys(props, (value, key) => ({
      key: getState(key, this.platformState),
      value: isString(value) ? getState(value, this.platformState) : value,
    }))
  }

  /**
   * Applies all the type transformers to the props
   */
  private applyPropTypeTransformers = (props: IPropData): IPropData =>
    deepReplaceObjectValues(props, (value, key, innerObj) => {
      if (!isTypedValue(value)) {
        return value
      }

      const typeKind = this.getTypeKindById(value.type)

      if (!typeKind) {
        return value
      }

      for (const propTransformer of this.typedValueTransformers) {
        if (
          !propTransformer.canHandleTypeKind(typeKind) ||
          !propTransformer.canHandleValue(value)
        ) {
          continue
        }

        return propTransformer.transform(value, typeKind)
      }
    })

  private getTypeKindById(typeId: string): ITypeKind | undefined {
    return getTypeService(this).type(typeId)?.kind
  }

  static initForBuilder = initForBuilder
}

export const renderServiceRef = rootRef<RenderService>(
  '@codelab/RenderServiceRef',
  {
    onResolvedValueChange(ref, newType, oldType) {
      if (oldType && !newType) {
        detach(ref)
      }
    },
  },
)
