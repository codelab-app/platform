import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Renderer } from '@codelab/frontend/modules/builder'
import { Element, ElementProps } from '@codelab/frontend/modules/element'
import {
  Action,
  actionRef,
  Store,
  storeRef,
} from '@codelab/frontend/modules/store'
import {
  Field,
  InterfaceType,
  PrimitiveType,
  typeRef,
} from '@codelab/frontend/modules/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import { AtomType, TypeKind } from '@codelab/shared/abstract/core'
import { frozen, ObjectMap, objectMap, Ref } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { v4 } from 'uuid'

const integerType = new PrimitiveType({
  name: 'Integer',
  primitiveKind: PrimitiveTypeKind.Integer,
})

const counterState = new InterfaceType({
  name: 'Counter State',
  _fields: new ObjectMap({
    items: {
      [v4()]: new Field({
        key: 'count',
        name: 'Count',
        type: typeRef(integerType.id),
      }),
    },
  }),
  typeKind: TypeKind.InterfaceType,
})

const emptyApi = new InterfaceType({ id: v4(), name: 'Empty api' }) // not relevant, just an empty type

const divAtom = new Atom({
  id: v4(),
  type: AtomType.HtmlDiv,
  api: typeRef(emptyApi),
  name: 'Div',
  tagIds: [],
})

const buttonAtom = new Atom({
  id: v4(),
  type: AtomType.AntDesignButton,
  api: typeRef(emptyApi),
  name: 'Button',
  tagIds: [],
})

const textAtom = new Atom({
  id: v4(),
  type: AtomType.Text,
  api: typeRef(emptyApi),
  name: 'Text',
  tagIds: [],
})

const textDec = new Element({
  id: v4(),
  atom: atomRef(textAtom),
  name: 'Decrement text',
  props: new ElementProps({
    id: v4(),
    data: frozen({ text: '-' }),
  }),
})

const textInc = new Element({
  id: v4(),
  atom: atomRef(textAtom),
  name: 'Increment text',
  props: new ElementProps({
    id: v4(),
    data: frozen({ text: '+' }),
  }),
})

const buttonDec = new Element({
  id: v4(),
  name: 'Button Decrement',
  atom: atomRef(buttonAtom),
  props: new ElementProps({
    id: v4(),
    data: frozen({
      onClick: '{{root.decrement}}',
    }),
  }),
  children: objectMap([[textDec.id, textDec]]),
})

const buttonInc = new Element({
  id: v4(),
  name: 'Button Increment',
  atom: atomRef(buttonAtom),
  props: new ElementProps({
    id: v4(),
    data: frozen({
      onClick: '{{root.increment}}',
    }),
  }),
  children: objectMap([[textInc.id, textInc]]),
})

const counterText = new Element({
  id: v4(),
  name: 'Counter text',
  atom: atomRef(textAtom),
  props: new ElementProps({
    id: v4(),
    data: frozen({
      text: '{{root.count}}',
    }),
  }),
})

const container = new Element({
  id: v4(),
  name: 'Container',
  atom: atomRef(divAtom),
  children: objectMap([
    [buttonDec.id, buttonDec],
    [counterText.id, counterText],
    [buttonInc.id, buttonInc],
  ]),
})

const root = new Element({
  id: v4(),
  name: 'Root element',
  children: objectMap([[container.id, container]]),
})

const demoStore = initializeStore()

demoStore.typeService.addTypeLocal(emptyApi)
demoStore.typeService.addTypeLocal(counterState)

demoStore.atomService.addAtom(divAtom)
demoStore.atomService.addAtom(buttonAtom)
demoStore.atomService.addAtom(textAtom)

demoStore.elementService.elementTree.setRoot(root)

const counterStore = new Store({
  name: 'counterStore',
  state: typeRef(counterState.id) as Ref<InterfaceType>,
  actions: [],
  storeKey: '',
  initialState: {
    count: 2.0,
  },
})

const incrementAction = new Action({
  name: 'increment',
  body: `function increment(){ this.count++ }`,
  store: storeRef(counterStore.id),
  id: v4(),
})

const decrementAction = new Action({
  name: 'decrement',
  body: `function decrement(){ this.count-- }`,
  store: storeRef(counterStore.id),
  id: v4(),
})

counterStore.setActions([incrementAction, decrementAction].map(actionRef))

demoStore.actionService.addAction(incrementAction)
demoStore.actionService.addAction(decrementAction)
demoStore.storeService.addStore(counterStore)

demoStore.renderService.init(
  demoStore.elementService.elementTree,
  undefined,
  counterStore.toMobxObservable(),
)

export const DemoRendererMobx = observer(() => {
  if (!demoStore.renderService.isInitialized) {
    return null
  }

  return (
    <>
      <Renderer renderService={demoStore.renderService} />
      <div>Props:</div>
    </>
  )
})
