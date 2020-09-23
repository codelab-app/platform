---
order: 5
path: '/props'
level: 0
key: 'props'
title: 'Props'
---

The goal is to extract all the props required for building a component like Ant Design into a json file. We use the `Tree.render` method to transform data into a React node. Many examples can be found inside `@codelab/components/ui` package as Storybooks.

## Basic Example

Here is a very simple example.

```jsx
export const buttonData = {
  type: 'Button',
  props: {
    type: 'primary',
  },
  children: [
    {
      type: 'Text',
      props: {
        value: 'Primary',
      },
    },
  ],
}

const Button = Tree.render(buttonData)

// <Button/> will render with all props injected
```

## Functions as props

What if we wanted to do more complicated logic? We can use Javascript's Eval function to transform string into functions.

```javascript
export const buttonData = {
  type: 'Button',
  props: {
    type: 'primary',
    onClick: {
      __type: 'eval',
      value: 'return () => console.log("Clicked!")',
    },
  },
}
```

## Using libraries

Let's say we wanted to use React hooks?

For eval props, NPM libraries are always available as `this`

```javascript
const hooksProps = {
  props: {
    ctx: {
      __type: 'eval',
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
  },
}
```

## Custom context

We can also create our own context to be used by eval props by using the special `ctx` prop. It's return object is injected as context for the other eval props of the same level

```javascript
const hooksProps = {
  props: {
    ctx: {
      __type: 'eval',
      value:
        'const [visible, setVisible] = this.React.useState(false); return { visible, setVisible }',
    },
    visible: {
      __type: 'eval',
      value: 'return this.visible',
    },
  },
}
```

## Render props

Sometimes we want to pass props from parent to children. We can do that with a special component called `Provider`. All props are passed through all descendants to the innermost children. (currently only passes to immediate children, will modify API soon)

```javascript
const hooksProps = {
  type: 'Provider',
}
```

Combine this with the previous example, the `visible` prop will be available to all descendants.

## Full examples

Check out the Default example in `modal/Modal.story.tsx` in `@codelab/components/ui` package
