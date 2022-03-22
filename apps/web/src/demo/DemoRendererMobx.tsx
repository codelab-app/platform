import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Renderer } from '@codelab/frontend/modules/builder'
import {
  ElementModel,
  ElementProps,
  elementRef,
} from '@codelab/frontend/modules/element'
import { InterfaceType, typeRef } from '@codelab/frontend/modules/type'
import { AtomType } from '@codelab/shared/abstract/core'
import { action, makeObservable, observable } from 'mobx'
import { frozen } from 'mobx-keystone'
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

const textDec = new ElementModel({
  id: v4(),
  atom: atomRef(textAtom),
  order: 1,
  name: 'Decrement text',
  props: new ElementProps({
    id: v4(),
    data: frozen({ text: '-' }),
  }),
})

const textInc = new ElementModel({
  id: v4(),
  atom: atomRef(textAtom),
  order: 1,
  name: 'Increment text',
  props: new ElementProps({
    id: v4(),
    data: frozen({ text: '+' }),
  }),
})

const buttonDec = new ElementModel({
  id: v4(),
  name: 'Button Decrement',
  atom: atomRef(buttonAtom),
  order: 1,
  props: new ElementProps({
    id: v4(),
    data: frozen({
      onClick: '{{root.decrement}}',
    }),
  }),
  children: [elementRef(textDec)],
})

const buttonInc = new ElementModel({
  id: v4(),
  name: 'Button Increment',
  atom: atomRef(buttonAtom),
  order: 2,
  props: new ElementProps({
    id: v4(),
    data: frozen({
      onClick: '{{root.increment}}',
    }),
  }),
  children: [elementRef(textInc)],
})

const counterText = new ElementModel({
  id: v4(),
  name: 'Counter text',
  atom: atomRef(textAtom),
  order: 2,
  props: new ElementProps({
    id: v4(),
    data: frozen({
      text: '{{root.counter}}',
    }),
  }),
})

const container = new ElementModel({
  id: v4(),
  name: 'Container',
  atom: atomRef(divAtom),
  order: 1,
  children: [
    elementRef(buttonDec),
    elementRef(counterText),
    elementRef(buttonInc),
  ],
})

const root = new ElementModel({
  id: v4(),
  name: 'Root element',
  order: 1,
  children: [elementRef(container)],
})

const demoStore = initializeStore()

demoStore.typeStore.addTypeLocal(emptyApi)
demoStore.atomStore.addAtomLocal(divAtom)
demoStore.atomStore.addAtomLocal(buttonAtom)
demoStore.atomStore.addAtomLocal(textAtom)

demoStore.elementStore.elementTree.addElement(counterText)
demoStore.elementStore.elementTree.addElement(textDec)
demoStore.elementStore.elementTree.addElement(textInc)
demoStore.elementStore.elementTree.addElement(buttonInc)
demoStore.elementStore.elementTree.addElement(buttonDec)
demoStore.elementStore.elementTree.addElement(container)
demoStore.elementStore.elementTree.addElement(root)

class PlatformState {
  counter = 0

  constructor() {
    makeObservable(this, {
      counter: observable,
      decrement: action,
      increment: action,
    })
  }

  increment() {
    this.counter += 1
  }

  decrement() {
    this.counter -= 1
  }
}

demoStore.renderer.init(
  demoStore.elementStore.elementTree,
  new PlatformState() as any,
)

export const DemoRendererMobx = observer(() => {
  if (!demoStore.renderer.isInitialized) {
    return null
  }

  return (
    <>
      <Renderer renderModel={demoStore.renderer} />
      <div>Props:</div>
    </>
  )
})
