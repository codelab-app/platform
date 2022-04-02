import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Renderer } from '@codelab/frontend/modules/builder'
import {
  Element,
  ElementProps,
  elementRef,
} from '@codelab/frontend/modules/element'
import { Action, Store, storeRef } from '@codelab/frontend/modules/store'
import {
  Field,
  InterfaceType,
  PrimitiveType,
  typeRef,
} from '@codelab/frontend/modules/type'
import { PrimitiveTypeKind } from '@codelab/shared/abstract/codegen-v2'
import { AtomType, TypeKind } from '@codelab/shared/abstract/core'
import { makeAutoObservable } from 'mobx'
import { frozen, ObjectMap } from 'mobx-keystone'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { v4 } from 'uuid'

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
  children: [elementRef(textDec)],
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
  children: [elementRef(textInc)],
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
  children: [
    elementRef(buttonDec),
    elementRef(counterText),
    elementRef(buttonInc),
  ],
})

const root = new Element({
  id: v4(),
  name: 'Root element',
  children: [elementRef(container)],
})

const demoStore = initializeStore()

demoStore.typeService.addTypeLocal(emptyApi)

demoStore.atomService.addAtom(divAtom)
demoStore.atomService.addAtom(buttonAtom)
demoStore.atomService.addAtom(textAtom)

demoStore.elementService.elementTree.addElement(counterText)
demoStore.elementService.elementTree.addElement(textDec)
demoStore.elementService.elementTree.addElement(textInc)
demoStore.elementService.elementTree.addElement(buttonInc)
demoStore.elementService.elementTree.addElement(buttonDec)
demoStore.elementService.elementTree.addElement(container)
demoStore.elementService.elementTree.addElement(root)

const counterStore = new Store({
  name: 'counterStore',
  stateId: v4(),
  storeKey: '',
  initialState: '{\n"count":2.0\n}',
})

const initialState = JSON.parse(counterStore.initialState)

const integerType = new PrimitiveType({
  name: 'Integer',
  primitiveKind: PrimitiveTypeKind.Integer,
})

const interfaceType = new InterfaceType({
  name: '',
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

const counterActions: Array<Action> = [
  new Action({
    name: 'increment',
    body: `function increment(){ this.count++ }`,
    store: storeRef(counterStore.id),
    id: counterStore.stateId,
  }),
  new Action({
    name: 'decrement',
    body: `function decrement(){ this.count-- }`,
    store: storeRef(counterStore.id),
    id: counterStore.stateId,
  }),
]

const createCounter = (state: InterfaceType, actions: Array<Action>) => {
  const payload = {
    ...state.fields.reduce(
      (all, x) => ({ ...all, [x.key]: initialState[x.key] }),
      {},
    ),
    ...actions.reduce(
      (all, x) => ({ ...all, [x.name]: eval(`(${x.body})`) }),
      {},
    ),
  }

  const d = makeAutoObservable(payload)
  console.log(d)

  return d
}

demoStore.renderService.init(
  demoStore.elementService.elementTree,
  undefined,
  createCounter(interfaceType, counterActions),
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
