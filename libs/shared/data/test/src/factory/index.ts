import type { RendererProps } from '@codelab/frontend/abstract/application'
import type { ICreateTypeData } from '@codelab/frontend/abstract/domain'
import type {
  IAtomDTO,
  IComponentDTO,
  IElementDTO,
  IFieldDTO,
  IPageDTO,
  IPrimitiveTypeDTO,
  IPropDTO,
  IReactNodeType,
  IReactNodeTypeDTO,
  IRenderPropType,
  IRenderPropTypeDTO,
  IStoreDTO,
} from '@codelab/shared/abstract/core'
import type { DeepPartial, Factory } from 'fishery'
import type { _DeepPartialObject } from 'utility-types/dist/mapped-types'
import atomFactory from './atom.factory'
import componentFactory from './component.factory'
import elementFactory from './element.factory'
import fieldFactory from './field.factory'
import pageFactory from './page.factory'
import propsFactory from './props.factory'
import rendererFactory from './renderer.factory'
import storeFactory from './store.factory'
import typeInterfaceFactory from './type-interface.factory'
import typePrimitiveFactory from './type-primitive.factory'
import typeReactNodeFactory from './type-react-node.factory'
import typeRenderPropFactory from './type-render-prop.factory'

/**
 * Inference causes weird issues, so we create a type here
 */
interface ModelFactory {
  atom: Factory<IAtomDTO>
  component: Factory<IComponentDTO>
  element: Factory<IElementDTO>
  field: Factory<IFieldDTO>
  page: Factory<IPageDTO>
  props: Factory<IPropDTO>
  renderer: Factory<RendererProps>
  store: Factory<IStoreDTO>
  typeInterface: Factory<ICreateTypeData>
  typePrimitive: Factory<IPrimitiveTypeDTO>
  typeReactNode: Factory<IReactNodeTypeDTO>
  typeRenderProp: Factory<IRenderPropTypeDTO>
}

const factories: ModelFactory = {
  atom: atomFactory,
  component: componentFactory,
  element: elementFactory,
  field: fieldFactory,
  page: pageFactory,
  props: propsFactory,
  renderer: rendererFactory,
  store: storeFactory,
  typeInterface: typeInterfaceFactory,
  typePrimitive: typePrimitiveFactory,
  typeReactNode: typeReactNodeFactory,
  typeRenderProp: typeRenderPropFactory,
}

type FactoryType = keyof ModelFactory

export class FactoryDto {
  static build<T extends FactoryType>(
    factoryType: T,
    params?: Parameters<ModelFactory[T]['build']>[0],
  ) {
    return factories[factoryType].build(
      params as _DeepPartialObject<Parameters<ModelFactory[T]['build']>[0]>,
    )
  }
}
