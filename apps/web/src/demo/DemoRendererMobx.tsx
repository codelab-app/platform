import { initializeStore } from '@codelab/frontend/model/infra/mobx'
import { Atom, atomRef } from '@codelab/frontend/modules/atom'
import { Renderer } from '@codelab/frontend/modules/builder'
import {
  Element,
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
      text: '{{root.counter}}',
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

demoStore.renderService.init(
  demoStore.elementService.elementTree,
  new PlatformState() as any,
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
