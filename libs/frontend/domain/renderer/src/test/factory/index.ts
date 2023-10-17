import atomFactory from './atom.factory'
import codeActionFactory from './code-action.factory'
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

const FactoryBuildTypeMap = {
  atom: atomFactory.build.bind(atomFactory),
  codeAction: codeActionFactory.build.bind(codeActionFactory),
  component: componentFactory.build.bind(componentFactory),
  element: elementFactory.build.bind(elementFactory),
  field: fieldFactory.build.bind(fieldFactory),
  page: pageFactory.build.bind(pageFactory),
  props: propsFactory.build.bind(propsFactory),
  renderer: rendererFactory.build.bind(rendererFactory),
  store: storeFactory.build.bind(storeFactory),
  typeInterface: typeInterfaceFactory.build.bind(typeInterfaceFactory),
  typePrimitive: typePrimitiveFactory.build.bind(typePrimitiveFactory),
  typeReactNode: typeReactNodeFactory.build.bind(typeReactNodeFactory),
  typeRenderProp: typeRenderPropFactory.build.bind(typeRenderPropFactory),
}

export const factoryBuild = <
  T extends keyof typeof FactoryBuildTypeMap,
  U extends Parameters<(typeof FactoryBuildTypeMap)[T]>[0],
>(
  factoryType: T,
  params?: U,
) => {
  // typecasting for inferring the factory type in the return
  // there might be a better way than this
  return FactoryBuildTypeMap[factoryType](
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    params as any,
  ) as unknown as ReturnType<(typeof FactoryBuildTypeMap)[typeof factoryType]>
}
